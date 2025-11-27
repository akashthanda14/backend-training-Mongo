import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: Array, required: true },
  rating: { type: Number, required: true },
  description: { type: String }, // Optional
  facilities: { type: [String] }, // Optional
  contactInfo: { // Optional
    phone: String,
    email: String,
    website: String,
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;

