import express from 'express';
import { getPatientProfile, updatePatientProfile } from '../controllers/pateint.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();



// Get and update patient profile
router.route('/profile')
  .get(protect, getPatientProfile)
  .put(protect, updatePatientProfile);

export default router;
