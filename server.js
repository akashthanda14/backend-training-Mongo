import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();  // No need for path, Render will inject env variables directly

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is Running at Port Number ${PORT}`);
});
