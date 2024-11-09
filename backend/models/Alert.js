import mongoose from "mongoose";

// Schema for the alert by the user
const alertSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    dangerLevel: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

const Alert = mongoose.model('Alerts', alertSchema);

export default Alert;