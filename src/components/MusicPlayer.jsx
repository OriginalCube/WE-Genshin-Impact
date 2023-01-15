import React from "react";
import mainData from "../data.json";
import AudioVisualizer from "./AudioVisualizer";

const MusicPlayer = (props) => {
  const [songIndex, setSongIndex] = React.useState(
    Math.floor(mainData["songs"].length * Math.random())
  );
  const [muted, setMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.3);
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);

  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);
  const { duration } = audioRef.current;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        skipButton();
      } else {
        setProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const skipButton = () => {
    setSongIndex(Math.floor(mainData["songs"].length * Math.random()));
  };

  React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current.src = `./assets/songs/${mainData["songs"][songIndex].name}.mp3`;
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    setPlaying(audioRef.isPlaying);
  }, [songIndex]);

  const lessVolume = () => {
    if (volume - 0.1 > 0) {
      setVolume(Math.round((volume - 0.1) * 10) / 10);
    } else {
      setVolume(0);
    }
  };

  const addVolume = () => {
    if (volume >= 0 && volume + 0.1 <= 1) {
      setVolume(volume + 0.1);
    }
  };

  const volumeMute = () => {
    if (muted === false) {
      audioRef.current.pause();
      setMuted(true);
    } else {
      audioRef.current.play();
      setMuted(false);
    }
  };

  React.useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  React.useEffect(() => {
    audioRef.current.play();
  }, [isPlaying]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="genshin-font music-player">
      <AudioVisualizer />
      <div className="music-player-container">
        <img src="./assets/images/albumcover.png" alt="" />
        <div className="music-player-text">
          <div className="music-player-text-container">
            <p className="music-title">{mainData["songs"][songIndex].name}</p>
            <p className="music-description">Heh</p>{" "}
          </div>
          <div className="music-icons">
            <img src="./assets/icons/shuffle.png" onClick={skipButton} alt="" />
            <img
              src="./assets/icons/volumeMinus.png"
              onClick={lessVolume}
              alt=""
            />
            <img
              src="./assets/icons/volumePlus.png"
              onClick={addVolume}
              alt=""
            />
            <img src="./assets/icons/mute.png" onClick={volumeMute} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
