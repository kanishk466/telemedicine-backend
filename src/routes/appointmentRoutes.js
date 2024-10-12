// routes/appointmentRoutes.mjs

import express from 'express';
import { createAppointment, getAppointments , updateAppointment , cancelAppointment , updateAppointmentStatus } from '../controllers/appointmentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createAppointment);
router.get('/:userId', protect, getAppointments);

// 2. Update appointment (date and time)
router.route("/:appointmentId").put(protect, updateAppointment);

// 3. Cancel appointment
router.route("/:appointmentId/cancel").put(protect, cancelAppointment);

// 4. Update appointment status
router.route("/:appointmentId/status").put(protect, updateAppointmentStatus);

export default router;
