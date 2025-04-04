import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

// Step 1: Create a Context
export const AuthContext = createContext();

// Step 2: Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Step 3: State to hold user information
  const [userDetails, setUserDetails] = useState(null); 
  const auth = getAuth();

  useEffect(() => {
    // Step 4: Listen for authentication state changes
    // const unsubscribe = onAuthStateChanged((user) => {
    //   setUser(user); // Update state with the current user or null
    // });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged")
      console.log("User" , user)
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
        console.log("localStorage.getItem: ",localStorage.getItem("token"))
        axios
        .get(`http://localhost:5001/api/getUserDetails/${user.email}`,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })  // API call to fetch user details
        .then((response) => {
          console.log("response.data",response.data)
          setUserDetails(response.data);  // Set user details from API response
          console.log("firstName",userDetails.firstName)
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });

        // ...
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Step 5: Provide the user state to children components
  return (
    <AuthContext.Provider value={{ user, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
