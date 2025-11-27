import express from "express"
import connectDB from "./config/db.js";
import cors from "cors";
import hospitalRoutes from "./routes/HospitalRoutes.js";
import authRoutes from "./routes/authRoutes.js";


connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/hospitals", hospitalRoutes);

export default app;

