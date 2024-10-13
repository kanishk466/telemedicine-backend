import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

// Register Doctor
export const registerDoctor = async (req, res) => {
  const { name, email, password, specialization, experience, phoneNumber } = req.body;
  try {
    let doctor = await Doctor.findOne({ email });
    if (doctor) return res.status(400).json({ msg: 'Doctor already exists' });

    doctor = new Doctor({ name, email, password, specialization , experience , phoneNumber });
    await doctor.save();

    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET);


    res.status(201).json({ _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization,
      experience : doctor.experience,
      phoneNumber : doctor.phoneNumber,
       token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Register Patient
export const registerPatient = async (req, res) => {
  const { name, email, password, age ,gender , phoneNumber} = req.body;
  try {
    let patient = await Patient.findOne({ email });
    if (patient) return res.status(400).json({ msg: 'Patient already exists' });

    patient = new Patient({ name, email, password, age });
    await patient.save();

    const token = jwt.sign({ id: patient._id, role: 'patient' }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user;
    if (role === 'doctor') user = await Doctor.findOne({ email });
    else if (role === 'patient') user = await Patient.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
    res.json({ token , 
      "_id": user._id,
      "name": user.name,
      "email": user.email,
      "specialization": user.specialization,
      "experience": user.experience,
      "phoneNumber": user.phoneNumber

     });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
