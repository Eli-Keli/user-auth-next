import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load the environment variables

console.log("MONGO_URI: ", process.env.MONGO_URI);

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
            console.log("MONGO_URI not found in environment variables");
            // process.exit(); // Exit the process if the MONGO_URI is not found
        }
        await mongoose.connect(process.env.MONGO_URI!) // Connect to the database
        const connection = mongoose.connection; // Get the default connection

        connection.on("connected", () => {
            console.log("Connected to database");
        });

        connection.on("error", (error) => {
            console.log("Error connecting to database: ", error);
            process.exit(); // Exit the process if there is an error connecting to the database
        });
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
}