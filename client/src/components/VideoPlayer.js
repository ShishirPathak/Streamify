import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

const VideoPlayer = () => {
  const [video, setVideo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/getOneVideo/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <ReactPlayer
    url={video.videoUrl}
    controls={true}
    width="80%"
    height="80%"
    style={{ marginTop: '2%', marginLeft: '10%' }}

  />
  );
};

export default VideoPlayer;
