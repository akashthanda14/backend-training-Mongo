import Hospital from "../models/Hospitals.js";

export const getAllHospitals = async () => {
  return Hospital.find();
};

export const createHospital = async (hospitalData) => {
  const hospital = new Hospital(hospitalData);
  return hospital.save();
};

export default { getAllHospitals, createHospital };
