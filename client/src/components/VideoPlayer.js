import React, { useEffect, useState, useRef } from "react";
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
import EngagementGraph from "./EngagementGraph";
import ReplayForwardTimeline  from "./ReplayForwardTimeline";

import { useLocation } from "react-router-dom";
import MostRewatchedMoments from "./MostRewatchedMoments";

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState("");
  const [userAction, setUserAction] = useState("none"); // 'like', 'dislike', or 'none'
  const { id } = useParams();
  const { user, userDetails } = useContext(AuthContext);
  const location = useLocation();

  const [showAnalytics, setShowAnalytics] = useState(false);


  const [sessionID] = useState(
    () =>  Math.random().toString(36).substring(2, 15)
  );
  const [hasCompleted, setHasCompleted] = useState(false);
  const lastReportedTime = useRef(0);
  const currentTimeRef = useRef(0);
  const sendProgress = async (playedSeconds, eventType) => {
    console.log("Sending progress:", playedSeconds, eventType);
    await axios.post("http://localhost:5001/api/track-progress", {
      videoId: id,
      sessionId: sessionID,
      timestamp: new Date(),
      playedSeconds,
      eventType,
      userId: userDetails.userId,
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const addToMongoDB = async (videoId) => {
    console.log("Adding to MongoDB", videoId);
    try {
      await axios.post(`http://localhost:5001/api/add-to-mongodb/${videoId}`, 
      {
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error sending to MongoDB:", error);
    }
  };

  useEffect(() => {
    return () => {
      console.log("🔁 Route changed or component unmounted");
      sendProgress(Math.floor(currentTimeRef.current), "exit");
      addToMongoDB(id);
    };
  }, [location.pathname]);
  

  useEffect(() => {
    // Fetch video data
    axios
      .get(`http://localhost:5001/api/getOneVideo/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => console.error(err));

    // Fetch user action data
    axios
      .get(
        `http://localhost:5001/api/getUserAction/${id}?userId=${userDetails.userId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }}
      )
      .then((res) => {
        setUserAction(res.data.userAction.action);
      })
      .catch((err) => console.error(err));
      
  }, [id]);

  const handleLikeDislike = (videoId, action) => {
    axios
      .post(`http://localhost:5001/api/likeDislike`, {
        videoId: videoId,
        userId: userDetails.userId,
        action,
      })
      .then((res) => {
        // After a successful like/dislike, fetch the latest video data
        axios
          .get(`http://localhost:5001/api/getOneVideo/${videoId}`)
          .then((res) => {
            setVideo(res.data);
          })
          .catch((err) => console.error(err));
        setUserAction(action);
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
        onProgress={({ playedSeconds }) => {
          currentTimeRef.current = playedSeconds;
          const roundedPlayedSeconds = Math.floor(playedSeconds);
          if (
            roundedPlayedSeconds % 5 === 0 &&
            roundedPlayedSeconds !== lastReportedTime.current
          ) {
            lastReportedTime.current = roundedPlayedSeconds;
            sendProgress(roundedPlayedSeconds, "play");
          }
        }}
        onPause={() =>
          sendProgress(Math.floor(currentTimeRef.current), "pause")
        }
        onSeek={(seconds) => {
          console.log("Seek event seconds:", seconds);
          if (typeof seconds === "number" && !isNaN(seconds)) {
            const direction = seconds > currentTimeRef.current ? "forward" : "rewind";
            sendProgress(Math.floor(seconds), direction);
          } else {
            console.error("Invalid seconds value:", seconds);
          }
        }}
        onEnded={() => {
          console.log("Video ended");
          sendProgress(Math.floor(currentTimeRef.current), "complete");
          addToMongoDB(video._id)
          setHasCompleted(true);
        }}
        onPlay={() => {
          if (hasCompleted) sendProgress(currentTimeRef.current, "replay");
        }}
        controls={true}
        width="80%"
        height="80%"
        style={{ marginTop: "2%", marginLeft: "10%" }}
      />
      <Typography variant="h5" sx={{ mt: 2, ml: "10%", mb: 2 }}>
        {video.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "10%" }}>
        <Button
          variant="outlined"
          onClick={() =>
            handleLikeDislike(
              video._id,
              userAction === "like" ? "none" : "like"
            )
          }
        >
          Like ({video.likes})
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            handleLikeDislike(
              video._id,
              userAction === "dislike" ? "none" : "dislike"
            )
          }
        >
          Dislike ({video.dislikes})
        </Button>
      </Box>
      <Box sx={{ ml: "10%", mt: 2 }}>
  <Button
    variant="outlined"
    onClick={() => setShowAnalytics(!showAnalytics)}
  >
    {showAnalytics ? "Hide Analytics" : "Show Analytics"}
  </Button>

  {showAnalytics && (
    <Box sx={{ mt: 2, width: "90%" }}>
      <MostRewatchedMoments videoId={video._id} />
          {/* 👇 Add below this */}
    <ReplayForwardTimeline videoId={video._id} />
    <EngagementGraph videoId={video._id} />

    </Box>
  )}
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
