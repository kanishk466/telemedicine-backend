import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const PatientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender :String,
  phoneNumber:Number,
  medicalHistory: [String],
});

PatientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;
