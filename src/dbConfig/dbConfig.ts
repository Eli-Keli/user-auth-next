import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!); // Connect to the database
        const connection = mongoose.connection; // Get the default connection

        connection.on("connected", () => {
            console.log("Connected to database");
        });

        connection.on("error", (error) => {
            console.log("Error connecting to database: ", error);
            process.exit(1); // Exit the process if there is an error connecting to the database
        });
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
}