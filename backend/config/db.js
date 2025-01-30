const mongoose = require("mongoose");
require("dotenv").config();

const db_Url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed");
  }
};

module.exports = connectDB;
