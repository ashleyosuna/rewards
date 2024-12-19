"use server";

import mongoose from "mongoose";

export default async function connect() {
  const connectionString = process.env.MONGO_URI;
  if (!connectionString) {
    console.log("Connection string not defined");
    return;
  }
  try {
    await mongoose.connect(connectionString);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
    return;
  }
}
