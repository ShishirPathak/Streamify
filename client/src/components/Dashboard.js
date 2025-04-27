import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const features = [
  {
    title: "Upload & Stream",
    desc: "Creators can upload high-quality videos and stream them instantly to viewers.",
  },
  {
    title: "Engagement Graph",
    desc: "Visualize viewer engagement in real-time — know where users rewind, skip or drop off.",
  },
  {
    title: "Replay vs Forward Insights",
    desc: "Track key moments in your content with dual-line behavioral graphs.",
  },
  {
    title: "Drop-off Detection",
    desc: "Find out exactly where you're losing audience attention.",
  },
];

const Dashboard = () => {
  const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!userDetails) {
      navigate('/signin');
      return;
      } 
    navigate('/my-videos');
  };

  return (
    <div>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: "#1e40af", color: "#fff", py: 8, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold">
          Streamify
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {userDetails?.firstName
            ? `Welcome, ${userDetails.firstName}!`
            : 'Your all-in-one video platform with advanced viewer analytics'}
        </Typography>
        {userDetails ? (
  <Button
    variant="contained"
    onClick={handleGetStarted}
    sx={{ mt: 4, bgcolor: "#f59e0b", color: "#000", fontWeight: "bold" }}
  >
    Get Started
  </Button>
) : (
  <Button
    variant="contained"
    onClick={handleGetStarted}
    sx={{ mt: 4, bgcolor: "#facc15", color: "#000", fontWeight: "bold" }}
  >
    Sign In to Get Started
  </Button>
)}

      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: "#f1f5f9", py: 6 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Typography fontWeight="bold" variant="subtitle1">1. Sign Up & Upload</Typography>
              <Typography>Creators register and upload their videos to Streamify.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight="bold" variant="subtitle1">2. Watch & Track</Typography>
              <Typography>Engagement events (play, pause, rewind, skip) are tracked in real-time.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight="bold" variant="subtitle1">3. Analyze & Improve</Typography>
              <Typography>Visual dashboards provide insights to optimize content strategy.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
