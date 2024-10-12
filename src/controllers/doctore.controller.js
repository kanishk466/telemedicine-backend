import Doctor from "../models/Doctor.js";


export const getDoctorProfile = async (req, res) => {


    const doctor = await Doctor.findById(req.user._id).select('-password');
  
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  };


  // Update doctor profile
export const updateDoctorProfile = async (req, res) => {
    const doctor = await Doctor.findById(req.user._id);
  
    if (doctor) {
      doctor.name = req.body.name || doctor.name;
      doctor.specialization = req.body.specialization || doctor.specialization;
      doctor.experience = req.body.experience || doctor.experience;
      doctor.phoneNumber = req.body.phoneNumber || doctor.phoneNumber;
  
      if (req.body.password) {
        doctor.password = req.body.password;
      }
  
      const updatedDoctor = await doctor.save();
      res.json({
        _id: updatedDoctor._id,
        name: updatedDoctor.name,
        email: updatedDoctor.email,
        specialization: updatedDoctor.specialization,
        experience: updatedDoctor.experience
      });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  };