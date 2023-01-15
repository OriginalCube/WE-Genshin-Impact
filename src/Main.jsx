import React from "react";
import VideoCanvas from "./components/VideoCanvas";
import MusicPlayer from "./components/MusicPlayer";
import OptionBar from "./components/OptionBar";

const Main = () => {
  return (
    <div>
      {<VideoCanvas />}
      <MusicPlayer />
      <OptionBar />
    </div>
  );
};

export default Main;
