const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://admin:Admin2022@cluster0.l6xp7.mongodb.net/christain-movies-app?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log("error: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
