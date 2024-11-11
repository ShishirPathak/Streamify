const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { S3Client } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const multer = require("multer");
const multerS3 = require("multer-s3");

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `profile-images/${Date.now()}_${file.originalname}`);
    },
  }),
}).single("profileImage");

// MongoDB schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  profileImageUrl: { type: String }, // Store S3 image URL here
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route to handle user data and image upload
app.post("/api/UploadUserDetails", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("S3 Upload Error:", err);
      return res.status(500).json({ error: "Error uploading file to S3" });
    }

    const { firstName, middleName, lastName, dob, email } = req.body;
    const profileImageUrl = req.file.location;

    try {
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        dob,
        email,
        profileImageUrl,
      });

      await newUser.save();
      res.status(201).json({ message: "User and image saved successfully!" });
    } catch (error) {
      console.error("Error saving user to MongoDB:", error);
      res.status(500).json({ error: "Error saving user data" });
    }
  });
});

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const { S3Client } = require("@aws-sdk/client-s3");
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const multer = require("multer");
// const multerS3 = require("multer-s3");

// let upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, Date.now() + "_" + file.originalname);
//     },
//   }),
// }).single("file");

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("connected to mongoodb"))
//   .catch((err) => console.log("MongoDB connection error !! :", err));

// // APP route to upload image file to AWS S3

// app.post("/api/uploadtos3", upload, (req, res) => {
//   try {
//     res.send(`File uploaded successfully.${req.file.location}`);
//   } catch (error) {
//     console.log("Error occured in uploadtos3 API. Error: ", error);
//   }
// });

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server running on Port: ${PORT}`);
// });
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.error("MongoDB connection error:", error));

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   middleName: { type: String },
//   lastName: { type: String, required: true },
//   dob: { type: Date, required: true },
//   email: { type: String, required: true, unique: true },
// });

// const User = mongoose.model("User", userSchema,"users");

// // API route to save user data
// app.post("/api/users", async (req, res) => {
//   try {
//     const { firstName, middleName, lastName, dob, email } = req.body;

//     // Create a new user entry
//     const newUser = new User({ firstName, middleName, lastName, dob, email });
//     await newUser.save();

//     res.status(201).json({ message: "User saved successfully" });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ message: "Error saving user", error });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.error("MongoDB connection error:", error));

// // AWS S3 configuration
// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new aws.S3();

// // Multer setup to handle file uploads to S3
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(null, `profile-images/${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   middleName: { type: String },
//   lastName: { type: String, required: true },
//   dob: { type: Date, required: true },
//   email: { type: String, required: true, unique: true },
//   profileImageUrl: { type: String }, // Store S3 image URL here
// });

// const User = mongoose.model("User", userSchema);

// // Route to upload image and user data
// app.post("/api/users", upload.single("profileImage"), async (req, res) => {
//   try {
//     const { firstName, middleName, lastName, dob, email } = req.body;
//     const profileImageUrl = req.file.location; // S3 URL of the uploaded image

//     // Create a new user entry
//     const newUser = new User({
//       firstName,
//       middleName,
//       lastName,
//       dob,
//       email,
//       profileImageUrl,
//     });
//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: "User saved successfully", profileImageUrl });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ message: "Error saving user", error });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
