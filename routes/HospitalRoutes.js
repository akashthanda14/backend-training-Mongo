import express from "express";
import {
  getAllHospitals,
  createHospital,
} from "../controllers/hospitalController.js";

const router = express.Router();

router.get("/", getAllHospitals);
router.post("/", createHospital);

export default router;