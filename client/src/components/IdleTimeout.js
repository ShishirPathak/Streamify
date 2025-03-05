import  { useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

const TIMEOUT_MINUTES = 1;  // Can make configurable via .env

const IdleTimeout = () => {
    const navigate = useNavigate();
  const handleIdle = () => {
   auth.signOut();
    //signOut(auth);
    window.location.reload(); // Optional: clear app state
  };

  const { start } = useIdleTimer({
    timeout: 1000 * 60 * TIMEOUT_MINUTES,
    onIdle: handleIdle,
    debounce: 500
  });

  useEffect(() => {
    // Handle tab close/refresh
    const handleUnload = () => signOut(auth).then(() => navigate('/signin'));
    
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      signOut(auth).then(() => navigate('/signin')); // Optional: Force logout on unmount
    };
  }, []);

  return null; // No UI needed
};

export default IdleTimeout;