import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Client } = pkg;

console.log("FORCED DB TEST — ignoring env vars");

const database = new Client({
  user: "postgres",
  host: "localhost",
  database: "leather",
  password: "talha",
  port: 5432,
});

const connectDB = async () => {
  try {
    await database.connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

connectDB();

export default database;
