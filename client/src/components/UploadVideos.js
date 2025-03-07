// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { FormControl, FormLabel, Box } from "@mui/material";
// import axios from "axios";

// function UploadVideos() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     file: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       file: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("file", formData.file);

//     try {
//       const response = await axios.post("http://localhost:5001/api/uploadVideo", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Video uploaded successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading video:", error);
//       alert("Failed to upload video");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
//       <FormControl fullWidth margin="normal">
//         <FormLabel>Video Title</FormLabel>
//         <TextField
//           type="text"
//           variant="outlined"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           required
//         />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <FormLabel>Video Description</FormLabel>
//         <TextField
//           type="text"
//           variant="outlined"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           required
//         />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <FormLabel>Upload Video</FormLabel>
//         <TextField
//           type="file"
//           name="uploadVideo"
//           variant="outlined"
//           inputProps={{ accept: "video/*" }}
//           onChange={handleFileChange}
//           required
//         />
//       </FormControl>
//       <Button type="submit" variant="contained" color="primary">
//         Upload Video
//       </Button>
//     </Box>
//   );
// }

// export default UploadVideos;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, Box, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function UploadVideos() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    category: "",
  });

  const { userDetails } = useContext(AuthContext);  // Get the authenticated user from AuthContext


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0], // Assuming you only want the first file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure a file is selected
    if (!formData.file) {
      alert("Please select a file to upload");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file); // Ensure the key matches the server's expected field name
    data.append("category", formData.category);
    data.append("userId", userDetails.userId);
    data.append("email", userDetails.email);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/uploadVideo",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // axios should set this automatically, but it's good to ensure it's correct
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Add the token to the headers
          },
        }
      );
      alert("Video uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
      <FormControl fullWidth margin="normal">
        <FormLabel>Video Title</FormLabel>
        <TextField
          type="text"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>Video Category</FormLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Documentaries">Documentaries</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="News">News</MenuItem>
          <MenuItem value="Cooking">Cooking</MenuItem>
          <MenuItem value="Tech">Tech</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>Video Description</FormLabel>
        <TextField
          type="text"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <FormLabel>Upload Video</FormLabel>
        <input
          type="file"
          name="uploadVideo"
          accept="video/*"
          onChange={handleFileChange}
          required
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Upload Video
      </Button>
    </Box>
  );
}

export default UploadVideos;
