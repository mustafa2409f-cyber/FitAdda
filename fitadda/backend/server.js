const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ status: "FitAdda API is live and running!" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tracker", require("./routes/trackerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FitAdda server running on port ${PORT}`);
});