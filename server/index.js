import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("DB connection successful!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});
