import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
   const conn = await mongoose.connect(ENV.DB_URL);
    console.log(`✅ Connected to mongo db: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ error in mongo db connection", error);
    process.exit(1); // failure =>1 , success => 0
  }
};
