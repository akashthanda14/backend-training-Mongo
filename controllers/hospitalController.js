import * as hospitalService from "../services/hospitalService.js";

// Get all hospitals
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospitals", error: error.message });
  }
};

// Create a new hospital
export const createHospital = async (req, res) => {
  try {
    const newHospital = await hospitalService.createHospital(req.body);
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to create hospital", error: error.message });
  }
};
