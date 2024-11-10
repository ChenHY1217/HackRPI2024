import express from "express";

// Importing controllers
import {
    getAllAlerts,
    getAllPersonalAlerts,
    createAlert,
    updateAlert,
    deleteAlert,
    getAlertById,
    getFilteredAlert,
} from "../controllers/AlertControllers.js";

// Importing middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", authenticate, getAllAlerts);
router.get("/personal", authenticate, getAllPersonalAlerts);

router.post("/create", authenticate, createAlert);
router.put("/:id", authenticate, updateAlert);
router.delete("/:id", authenticate, deleteAlert);

router.get("/:id", authenticate, getAlertById);
router.get("/filter", authenticate, getFilteredAlert); // New route for filtering alerts

export default router;
