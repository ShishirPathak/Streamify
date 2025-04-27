import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from './AuthContext';  // Importing AuthContext to get the authenticated user

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);  // State for storing user details
  const { user } = useContext(AuthContext);  // Get the authenticated user from AuthContext

  // Fetch user details from API whenever the user object changes (e.g., on login)
  useEffect(() => {
    if (user && user.email) {
      // Make sure user is authenticated and email is available
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/getUserDetails/${user.email}`)  // API call to fetch user details
        .then((response) => {
          setUserDetails(response.data);  // Set user details from API response
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [user]);  // Run whenever the `user` object from AuthContext changes

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context data
export const useUserContext = () => {
  return useContext(UserContext);  // This hook allows any component to access the user details
};
