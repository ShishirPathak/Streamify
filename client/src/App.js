import "./App.css";
import React from "react";
import SignIn from "./components/SignIn";
import MyVideos from "./components/MyVideos";
import UploadVideos from "./components/UploadVideos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { AuthProvider } from "./context/AuthContext";
import SignOut from "./components/SignOut";
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <>
      <AuthProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/upload-videos" element={<UploadVideos />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
