import User from "../models/User";
import Alert from "../models/Alert";
import bcryptjs from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler";
import createToken from "../utils/createToken";

// @desc   Get all Alerts
// @route  GET /api/alerts/all
// @access Private
const getAllAlerts = asyncHandler(async (req, res) => {
    const alerts = await Alert.find({});
    res.json(alerts);
});

// @desc   Get all personal Alerts
// @route  GET /api/alerts/personal
// @access Private
const getAllPersonalAlerts = asyncHandler(async (req, res) => {
    const alerts = await Alert.find({ userId: req.user._id });
    res.json(alerts);
});

// @desc   Create an alert
// @route  POST /api/alerts/create
// @access Private

const createAlert = asyncHandler(async (req, res) => {
    const { type, dangerLevel, message } = req.body;

    const alert = new Alert({
        type,
        dangerLevel: dangerLevel || 0,
        message,
        userId: req.user._id
    });

    const createdAlert = await alert.save();
    res.status(201).json(createdAlert);
});

// @desc   Update an alert
// @route  PUT /api/alerts/:id
// @access Private
const updateAlert = asyncHandler(async (req, res) => {
    const alert = await Alert.findById(req.params.id);

    if (alert) {
        alert.type = req.body.type || alert.type;
        alert.dangerLevel = req.body.dangerLevel || alert.dangerLevel;
        alert.message = req.body.message || alert.message;

        const updatedAlert = await alert.save();
        res.json(updatedAlert);
    } else {
        res.status(404);
        throw new Error("Alert not found");
    }
});

// @desc   Delete an alert
// @route  DELETE /api/alerts/:id
// @access Private
const deleteAlert = asyncHandler(async (req, res) => {
    const alert = await Alert.findById(req.params.id);

    if (alert) {
        await alert.remove();
        res.json({ message: "Alert removed" });
    } else {
        res.status(404);
        throw new Error("Alert not found");
    }
});

// @desc   Get an alert by ID
// @route  GET /api/alerts/:id
// @access Private
const getAlertById = asyncHandler(async (req, res) => {
    const alert = await Alert.findById(req.params.id);

    if (alert) {
        res.json(alert);
    } else {
        res.status(404);
        throw new Error("Alert not found");
    }
});

// @desc   Get filtered alerts
// @route  GET /api/alerts/filter
// @access Private
const getFilteredAlert = asyncHandler(async (req, res) => {
    const { type, dangerLevel, location, time } = req.query;
    const query = {};

    if (type) {
        query.type = type;
    }

    if (dangerLevel) {
        query.dangerLevel = dangerLevel;
    }

    if (location) {
        query.location = location;
    }
    if (time) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        query.createdAt = {
            $gte: thirtyDaysAgo
        };
    }
    
    const alerts = await Alert.find(query);
    res.json(alerts);
});

export {
    getAllAlerts,
    getAllPersonalAlerts,
    createAlert,
    updateAlert,
    deleteAlert,
    getAlertById,
    getFilteredAlert
};

