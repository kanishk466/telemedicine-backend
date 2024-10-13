import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import doctorRoute from "./src/routes/doctor.route.js"
import pateintRoute from "./src/routes/patient.route.js"
import cors from "cors"
// Initialize environment varia/v1bles
dotenv.config();

// Initialize express app
const app = express();

// Database connection
connectDB();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
// Routes

app.use('/appointments', appointmentRoutes);
app.use('/auth', authRoutes);
app.use('/doctor' , doctorRoute);
app.use('/patient' , pateintRoute);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app ;
