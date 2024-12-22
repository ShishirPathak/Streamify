import React from 'react';
import { Grid2 as Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const { user, userDetails } = useContext(AuthContext);

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  // Dummy data with different image URLs
  const dummyData = Array(12).fill().map((_, index) => ({
    title: 'Dummy Video',
    description: 'This is a dummy video.',
    imageUrl: `https://picsum.photos/seed/${index}/300`,
  }));

  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', p: 2 }}>
      {/* Welcome Header */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center">
          Welcome {userDetails ? userDetails.firstName : 'loading...'} to the STREAMIFY Application !!!
        </Typography>
      </Box>

      {/* Video Grid */}
      <Grid container spacing={3}>
        {dummyData.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ bgcolor: '#333', color: '#fff' }}>
              <CardMedia
                component="img"
                height="140"
                image={video.imageUrl}
                alt={video.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2">
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;