import Patient from '../models/Patient.js';




// Get patient profile
export const getPatientProfile = async (req, res) => {
  const patient = await Patient.findById(req.user._id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  const patient = await Patient.findById(req.user._id);

  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.age = req.body.age || patient.age;
    patient.phoneNumber = req.body.phoneNumber || patient.phoneNumber;
    patient.gender = req.body.gender || patient.gender;

    if (req.body.password) {
      patient.password = req.body.password;
    }

    const updatedPatient = await patient.save();
    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      email: updatedPatient.email,
      token: generateToken(updatedPatient._id),
    });
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
};
