import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  medicines: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      instructions: { type: String },
    },
  ],
  digitalSignature: { type: String, required: true },
}, {
  timestamps: true,
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
