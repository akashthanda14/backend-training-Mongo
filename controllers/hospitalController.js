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

// Get hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await hospitalService.getHospitalById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hospital", error: error.message });
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

// Update hospital
export const updateHospital = async (req, res) => {
  try {
    const updatedHospital = await hospitalService.updateHospital(req.params.id, req.body);
    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: "Failed to update hospital", error: error.message });
  }
};

// Delete hospital
export const deleteHospital = async (req, res) => {
  try {
    const deletedHospital = await hospitalService.deleteHospital(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hospital", error: error.message });
  }
};
