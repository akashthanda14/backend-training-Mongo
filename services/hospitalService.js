import Hospital from "../models/Hospitals.js";

export const getAllHospitals = async () => {
  return Hospital.find();
};

export const getHospitalById = async (id) => {
  return Hospital.findById(id);
};

export const createHospital = async (hospitalData) => {
  const hospital = new Hospital(hospitalData);
  return hospital.save();
};

export const updateHospital = async (id, hospitalData) => {
  return Hospital.findByIdAndUpdate(id, hospitalData, { 
    new: true, 
    runValidators: true 
  });
};

export const deleteHospital = async (id) => {
  return Hospital.findByIdAndDelete(id);
};

export default { 
  getAllHospitals, 
  getHospitalById, 
  createHospital, 
  updateHospital, 
  deleteHospital 
};
