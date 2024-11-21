// import React from "react";
// import { Stack, Typography } from "@mui/material";

// export default function Dashboard() {
//     console.log("Dashhhhhh")
//   return (
//     <>
//       <Stack>
//         <Typography> Dashboard</Typography>
//       </Stack>
//     </>
//   );
// }

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, userDetails } = useContext(AuthContext);

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {userDetails ? userDetails.firstName : 'loading...'}</h1>
      <p>Email: {user?.email}</p>
      {userDetails && (
        <div>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

