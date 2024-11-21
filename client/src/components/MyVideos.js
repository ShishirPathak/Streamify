import React from 'react'
import ReactPlayer from 'react-player'
// function MyVideos() {
//   return (
//     <div>MyVideos
//       <ReactPlayer url='https://dmsqwaod139y1.cloudfront.net/videos/1731360620348_mp4file_ex1.mp4' />
//     </div>
    
//   )
// }

// export default MyVideos

const MyVideos = () => {
  const videoUrl =
    "https://dmsqwaod139y1.cloudfront.net/videos/1731360620348_mp4file_ex1.mp4";

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <ReactPlayer
        url={videoUrl}
        controls={true} // Show player controls (play, pause, volume, etc.)
        width="640px"   // Width of the player
        height="360px"  // Height of the player
        onProgress={(progress) => console.log("Progress:", progress)} // Log progress events
        onPlay={() => console.log("Video is playing")} // Handle play event
        onPause={() => console.log("Video is paused")} // Handle pause event
      />
    </div>
  );
};

export default MyVideos;