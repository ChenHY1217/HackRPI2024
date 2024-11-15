import mongoose from "mongoose";

// Schema for the user
// Stores the user's username, email, password, target languages, learning progress, chat history, and admin status
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    isAdmin: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    alerts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Alerts'}],
}, { timestamps: true });

const User = mongoose.model('Users', userSchema);

export default User;