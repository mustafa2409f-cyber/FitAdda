const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;