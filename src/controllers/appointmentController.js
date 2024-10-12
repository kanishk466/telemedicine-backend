// controllers/appointmentController.mjs

import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

// Create a new appointment
// export const createAppointment = async (req, res) => {
//   const { doctorId, patientId, date, time } = req.body;
//   try {
//     // Verify that doctor and patient exist
//     const doctor = await Doctor.findById(doctorId);
//     const patient = await Patient.findById(patientId);

//     if (!doctor || !patient) {
//       return res.status(404).json({ msg: 'Doctor or patient not found' });
//     }

//     // Create a new appointment
//     const appointment = new Appointment({
//       doctor: doctorId,
//       patient: patientId,
//       date,
//       time,
//       status: 'pending',
//     });

//     await appointment.save();
//     res.status(201).json({ appointment });
//   } catch (error) {
//     console.error('Error creating appointment:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// Get appointments for a user (doctor or patient)
export const getAppointments = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.query; // 'doctor' or 'patient'

  try {
    let appointments;
    if (role === 'doctor') {
      appointments = await Appointment.find({ doctor: userId })
        .populate('patient')
        .exec();
    } else if (role === 'patient') {
      appointments = await Appointment.find({ patient: userId })
        .populate('doctor')
        .exec();
    } else {
      return res.status(400).json({ msg: 'Invalid role specified' });
    }

    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Server error' });
  }
};





// 1. Create or Schedule a new appointment
export const createAppointment = async (req, res) => {
  const { doctorId, patientId, date, time, status } = req.body;

  try {
    const appointment = new Appointment({
      doctorId,
      patientId,
      date,
      time,
      status,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Update Appointment (Date and Time)
export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { date, time } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the date and time
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;

    await appointment.save();
    res.status(200).json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Cancel Appointment
export const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update status to canceled
    appointment.status = "canceled";
    await appointment.save();

    res.status(200).json({ message: "Appointment canceled successfully", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. Update Appointment Status (e.g., Confirmed, Completed)
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Allowed statuses: pending, confirmed, completed, canceled
    const validStatuses = ["pending", "confirmed", "completed", "canceled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid appointment status" });
    }

    // Update the appointment status
    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Appointment status updated successfully", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
