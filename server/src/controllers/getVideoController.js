const VideoModel = require("../models/UploadVideoModel");

const getVideoDetails = async (req, res) => {
  try {
    const email = req.params.email;
    const videoDetails = await VideoModel.find({ email: email });

    if(videoDetails){
        console.log("getVideoDetails");
        res.status(200).json(videoDetails);
    }else{
        res.status(400).json({message: "No videos found !!"})
    }

  } catch (error) {
    console.error("getVideoDetails", error);
  }
};

module.exports = { getVideoDetails };
