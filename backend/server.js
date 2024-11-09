import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// File imports
import connectDB from './config/mongodb.js';
import UserRoutes from './routes/UserRoutes.js';
import AlertRoutes from './routes/AlertRoutes.js';

// Configuration and connecting to MongoDB database
dotenv.config();
connectDB();

// Creating server via express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/alerts', AlertRoutes);

// Starting server
app.listen(PORT, console.log('Server is running on port 5000'));
