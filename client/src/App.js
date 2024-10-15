import './App.css';
import React from "react";
import ResponsiveAppBar from './Dashboard';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<ResponsiveAppBar />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
       </Routes>
    </>
 );

}

export default App;
