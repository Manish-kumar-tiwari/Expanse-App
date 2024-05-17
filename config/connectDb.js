const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`Database is Connected`.bgGreen);
  } catch (error) {
    console.log(`Database connection failed`.bgRed);
  }
};

module.exports = connectDb;
