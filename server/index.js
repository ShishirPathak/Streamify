const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const uploadVideo = require("./src/routes/uploadVideo");
const uploadUserDetails = require("./src/routes/user");
const videoRoute = require("./src/routes/videoRoute");
const redisRoute = require("./src/routes/configRedisRoutes");
const checkAuth = require("./src/middleware/checkAuth");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route not utilizing any authentication
app.get('/api/project-health', function (req, res) {
  res.send('Hello World! API is working fine on port: ' + process.env.PORT);
})


app.use("/api", checkAuth, uploadVideo);
app.use("/api", checkAuth, uploadUserDetails); 
app.use("/api", checkAuth, videoRoute); 
app.use("/api", checkAuth, redisRoute);



// MongoDB Connection (Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log("Error connecting to MongoDB Atlas:", error));

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
