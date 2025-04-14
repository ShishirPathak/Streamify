import React, { useState } from "react";
import { TextField, Button, Box, Input } from "@mui/material";
import axios from "axios";
import { AuthContext } from '../context/AuthContext'
import { useContext } from "react";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    userId:"",
    profileImage: null,
  });

  const { user, userDetails } = useContext(AuthContext);

  // Fetch user email from local storage or set a default for testing
  // const email = localStorage.getItem("userEmail") || "example@example.com";

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("middleName", formData.middleName);
      data.append("lastName", formData.lastName);
      data.append("dob", formData.dob);
      data.append("email", user.email);
      data.append("profileImage", formData.profileImage);
      data.append("userId", formData.userId);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/UploadUserDetails`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        m: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="First Name"
        name="firstName"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Middle Name (Optional)"
        name="middleName"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.middleName}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Date of Birth"
        name="dob"
        type="date"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.dob}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        value={user?.email}
        onChange={handleChange}
        InputProps={{ readOnly: true }}
      />
        <TextField
        label="User ID"
        name="userId"
        variant="outlined"
        margin="normal"
        fullWidth
        value={user?.userId}
        onChange={handleChange}

        // InputProps={{ readOnly: true }}
      />
      <Input
        type="file"
        name="profileImage"
        onChange={handleFileChange}
        sx={{ mt: 2, mb: 2 }}
        inputProps={{ accept: "image/*" }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default MyProfile;

// import React, { useState } from "react";
// import { TextField, Button, Box } from "@mui/material";
// import axios from "axios";

// const MyProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     dob: "",
//   });

//   // Fetch user email from local storage
//   // const email = localStorage.getItem("userEmail") || "example@example.com";
//   const email = "example@example.com"; // Default for testing

//     const handleFileChange = (e) => {
//     setFormData({ ...formData, profileImage: e.target.files[0] });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Submit form data along with email
//       await axios.post("http://localhost:5001/api/users", {
//         ...formData,
//         email,
//       });
//       alert("Data saved successfully!");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         maxWidth: 400,
//         m: "auto",
//       }}
//       onSubmit={handleSubmit}
//     >
//       <TextField
//         label="First Name"
//         name="firstName"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.firstName}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         label="Middle Name (Optional)"
//         name="middleName"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.middleName}
//         onChange={handleChange}
//       />
//       <TextField
//         label="Last Name"
//         name="lastName"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.lastName}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         label="Date of Birth"
//         name="dob"
//         type="date"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.dob}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         required
//       />
//       <TextField
//         label="Email (User ID)"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={email}
//         InputProps={{ readOnly: true }}
//       />
//       <Input
//         type="file"
//         name="profileImage"
//         onChange={handleFileChange}
//         sx={{ mt: 2, mb: 2 }}
//         inputProps={{ accept: "image/*" }}
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default MyProfile;

// import React, { useState } from "react";
// import { TextField, Button, Box, Input } from "@mui/material";
// import axios from "axios";

// const MyProfile = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     dob: "",
//     profileImage: null,
//   });

//   const email = localStorage.getItem("userEmail") || "example@example.com"; // Default for testing

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, profileImage: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataObj = new FormData();
//     formDataObj.append("firstName", formData.firstName);
//     formDataObj.append("middleName", formData.middleName);
//     formDataObj.append("lastName", formData.lastName);
//     formDataObj.append("dob", formData.dob);
//     formDataObj.append("email", email);
//     formDataObj.append("profileImage", formData.profileImage);

//     try {
//       const response = await axios.post("http://localhost:5001/api/users", formDataObj, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Data saved successfully!");
//       console.log(response.data.profileImageUrl);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   return (
//     <Box
//       component="form"
//       sx={{ display: "flex", flexDirection: "column", maxWidth: 400, m: "auto" }}
//       onSubmit={handleSubmit}
//     >
//       <TextField
//         label="First Name"
//         name="firstName"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.firstName}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         label="Middle Name (Optional)"
//         name="middleName"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.middleName}
//         onChange={handleChange}
//       />
//       <TextField
//         label="Last Name"
//         name="lastName"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.lastName}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         label="Date of Birth"
//         name="dob"
//         type="date"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={formData.dob}
//         onChange={handleChange}
//         InputLabelProps={{ shrink: true }}
//         required
//       />
//       <TextField
//         label="Email (User ID)"
//         variant="outlined"
//         margin="normal"
//         fullWidth
//         value={email}
//         InputProps={{ readOnly: true }}
//       />
//       <Input
//         type="file"
//         name="profileImage"
//         onChange={handleFileChange}
//         sx={{ mt: 2, mb: 2 }}
//         inputProps={{ accept: "image/*" }}
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default MyProfile;
