// SignOut.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await auth.signOut();
        navigate("/"); // Redirect to sign-in after signing out
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };

    signOutUser();
  }, [navigate]);

  return <div>Signing out...</div>;
};

export default SignOut;
