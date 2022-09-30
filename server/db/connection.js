const mongoose = require("mongoose");

const connectDB = async (URI, callback) => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to the database....");
    callback();
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = connectDB;
