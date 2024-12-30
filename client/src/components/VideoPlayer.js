import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user, userDetails } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getOneVideo/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleLike = () => {
    axios
      .post(`http://localhost:5001/api/likeVideo/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDislike = () => {
    axios
      .post(`http://localhost:5001/api/dislikeVideo/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleComment = () => {
    axios
      .post(`http://localhost:5001/api/addComment/${id}`, {
        userId: userDetails.userId,
        comment,
      })
      .then((res) => {
        setVideo(res.data);
        setComment("");
      })
      .catch((err) => console.error(err));
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReactPlayer
        url={video.videoUrl}
        controls={true}
        width="80%"
        height="80%"
        style={{ marginTop: "2%", marginLeft: "10%" }}
      />
      <Typography variant="h5" sx={{ mt: 2, ml: "10%" ,mb:2 }}>
        {video.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "10%" }}>
        <Button variant="outlined" onClick={handleLike}>
          Like ({video.likes})
        </Button>
        <Button variant="outlined" onClick={handleDislike}>
          Dislike ({video.dislikes})
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, ml: "10%" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Add a comment"
          sx={{ mb: 2, pt: 1, width: "50%" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleComment}
          sx={{ p: 1 }}
        >
          Add Comment
        </Button>
      </Box>
      <Box sx={{ mt: 1, ml: "10%", width: "80%" }}>
        {video.comments.map((comment, index) => (
          <Card key={index} sx={{ mb: 1, border: "1px solid #000" }}>
            <CardHeader
              sx={{ pb: 0 }}
              avatar={
                <Avatar>
                  {comment.userId.charAt(0).toUpperCase()}{" "}
                  {/* Display the first letter of the user ID */}
                </Avatar>
              }
              title={
                <Typography variant="subtitle1" sx={{ fontFamily: "Arial" }}>
                  {comment.userId}
                </Typography>
              }
            />
            <CardContent sx={{ pt: 1 }}>
              <Typography variant="body1" sx={{ fontFamily: "Arial" }}>
                {comment.comment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );

  // return (
  //   <div>
  //     <ReactPlayer
  //       url={video.videoUrl}
  //       controls={true}
  //       width="80%"
  //       height="80%"
  //       style={{ marginTop: "2%", marginLeft: "10%" }}
  //     />
  //     <button onClick={handleLike}>Like ({video.likes})</button>
  //     <button onClick={handleDislike}>Dislike ({video.dislikes})</button>
  //     <div>
  //       <input
  //         type="text"
  //         value={comment}
  //         onChange={(e) => {
  //           setComment(e.target.value);
  //         }}
  //       />
  //       <button onClick={handleComment}> Add Comment</button>
  //       <div>
  //         {video.comments.map((comment, index) => (
  //           <div key={index}>
  //             <h5>{comment.userId}</h5>
  //             <p>{comment.comment}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default VideoPlayer;
