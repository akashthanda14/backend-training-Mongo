import express from "express";
import {
  getAllHospitals,
  createHospital,
  getHospitalById,
  updateHospital,
  deleteHospital,
} from "../controllers/hospitalController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllHospitals);
router.get("/:id", getHospitalById);

// Protected routes (require authentication)
router.post("/", authenticate, createHospital);
router.put("/:id", authenticate, updateHospital);
router.delete("/:id", authenticate, deleteHospital);

export default router;