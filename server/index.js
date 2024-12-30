const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const uploadVideo = require("./src/routes/uploadVideo");
const uploadUserDetails = require("./src/routes/user");
const videoRoute = require("./src/routes/videoRoute");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", uploadVideo);
app.use("/api", uploadUserDetails); 
app.use("/api", videoRoute); 


// MongoDB Connection (Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Error connecting to MongoDB Atlas:", error));

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
