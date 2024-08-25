import mongoose from "mongoose";

export async function dbConnection() {
  try {
    const connectionString: string | undefined = process.env.MONGODB_URI;
    if (!connectionString) throw Error("Connection string is not defined.");
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Successfully connected to database.");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}
