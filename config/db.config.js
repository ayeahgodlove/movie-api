const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log("error: ", err);
    process.exit(1);
  }
};

module.exports = { connectMongoDB };
