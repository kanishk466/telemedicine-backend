import express from 'express';
import {  getDoctorProfile, updateDoctorProfile } from '../controllers/doctore.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();



// Get and update doctor profile
router.route('/profile')
  .get(protect, getDoctorProfile)
  .put(protect, updateDoctorProfile);

export default router;
