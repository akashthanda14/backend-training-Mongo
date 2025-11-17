import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Render will directly use the dashboard environment variables

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("❌ MONGODB_URI is not defined in the environment variables");
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            dbName: "hospitalDB",   // Optional if already part of URI
            maxPoolSize: 10
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
