import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useContext(AuthContext); // Get the authenticated user from AuthContext

  useEffect(() => {
    // Replace with your email
    const email = "pathakshishir123@gmail.com";
    axios
      .get(`http://localhost:5001/api/getAllVideo/${user.email}`)
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {videos.map((video) => (
        <Grid size={3} item xs={12} sm={6} md={4} key={video._id}>
          <Link to={`/video/${video._id}`}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <ReactPlayer
                url={video.videoUrl}
                controls={true}
                width="100%"
                height="auto"
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyVideos;
