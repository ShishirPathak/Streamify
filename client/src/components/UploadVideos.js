import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, Box } from "@mui/material";
import axios from "axios";

function UploadVideos() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

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
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file);

    try {
      const response = await axios.post("http://localhost:5000/api/uploadVideo", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Video uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
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
        <TextField
          type="file"
          name="uploadVideo"
          variant="outlined"
          inputProps={{ accept: "video/*" }}
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
