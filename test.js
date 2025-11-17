import connectDB from "./config/db.js";
import Hospital from "./models/Hospitals.js";
import dotenv from "dotenv";

dotenv.config();

const seedHospitals = [
  {
    name: "City General Hospital",
    city: "Metropolis",
    image: "https://example.com/images/city-general.jpg",
    speciality: ["Cardiology", "Neurology"],
    rating: 4.5,
    description: "A full-service hospital with a focus on emergency and specialty care.",
    facilities: ["Emergency", "ICU", "Pharmacy"],
    contactInfo: { phone: "+1-555-0100", email: "info@citygeneral.example" },
  },
  {
    name: "Lakeside Medical Center",
    city: "Lakeside",
    image: "https://example.com/images/lakeside.jpg",
    speciality: ["Orthopedics", "Rehabilitation"],
    rating: 4.2,
    description: "Known for orthopedic surgery and rehabilitation programs.",
    facilities: ["Surgery", "Rehab", "Outpatient"],
    contactInfo: { phone: "+1-555-0200", email: "contact@lakeside.example" },
  },
  {
    name: "Green Valley Clinic",
    city: "Green Valley",
    image: "https://example.com/images/greenvalley.jpg",
    speciality: ["Pediatrics", "Family Medicine"],
    rating: 4.7,
    description: "Community-focused clinic offering primary care for families.",
    facilities: ["Outpatient", "Pharmacy"],
    contactInfo: { phone: "+1-555-0300", email: "hello@greenvalley.example" },
  },
];

const run = async () => {
  await connectDB();

  try {
    // Clear existing hospitals (optional)
    await Hospital.deleteMany({});

    const inserted = await Hospital.insertMany(seedHospitals);
    console.log(`Inserted ${inserted.length} hospitals`);
    inserted.forEach(h => console.log(h._id.toString(), h.name));
  } catch (err) {
    console.error("Seeding error:", err.message);
  } finally {
    // Close mongoose connection
    process.exit(0);
  }
};

run();
