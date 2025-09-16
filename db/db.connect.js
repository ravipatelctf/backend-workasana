const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB

async function initializeDatabase() {
    await mongoose
        .connect(mongoUri)
        .then(() => {
            console.log(`Connected to database successfully.`);
        })
        .catch((error) => {
            throw new Error(error)
        })
}

module.exports = {initializeDatabase};