import React from "react";
import mainData from "../data.json";
import AudioVisualizer from "./AudioVisualizer";

const MusicPlayer = (props) => {
  let audioBite = new Audio();
  const [songIndex, setSongIndex] = React.useState(
    Math.floor(mainData["songs"].length * Math.random())
  );
  const [muted, setMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.3);
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);
  const [charName, setCharName] = React.useState("");
  const [replay, setReplay] = React.useState(false);
  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);
  const { duration } = audioRef.current;

  const startTimer = (props) => {
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
    if (replay === false) {
      setMuted(false);
      setSongIndex(Math.floor(mainData["songs"].length * Math.random()));
      props.handleImageId();
    } else {
      audioRef.current.play();
    }
    audioBitePlay(0);
  };

  React.useEffect(() => {
    audioRef.current.pause();
    setCharName(mainData["songs"][songIndex].sub);
    audioRef.current.src = `./assets/characters/${mainData["songs"][songIndex].sub}/${mainData["songs"][songIndex].name}.mp3`;
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

  const audioBitePlay = (e) => {
    if (e === 0) {
      audioBite.src = "./assets/audios/play.mp3";
    } else if (e === 1) {
      audioBite.src = "./assets/audios/volume.mp3";
    }
    audioBite.volume = 0.4;
    audioBite.play();
  };
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    setPlaying(false);
    startTimer();
  };

  const lessVolume = () => {
    if (volume - 0.1 > 0) {
      setVolume(Math.round((volume - 0.1) * 10) / 10);
    } else {
      setVolume(0);
    }
    audioBitePlay(1);
  };

  const addVolume = () => {
    if (volume >= 0 && volume + 0.1 <= 1) {
      setVolume(volume + 0.1);
    }
    audioBitePlay(1);
  };

  const volumeMute = () => {
    if (muted === false) {
      audioRef.current.pause();
      setMuted(true);
    } else {
      audioRef.current.play();
      setMuted(false);
    }
    audioBitePlay(0);
  };

  const onReplay = () => {
    setReplay(!replay);
    audioBitePlay(0);
  };

  React.useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      setMuted(true);
      startTimer();
    } else {
      audioRef.current.play();
      setMuted(false);
    }
  }, [isPlaying]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="genshin-font music-player">
      <div>
        <input
          type="range"
          step="1"
          min="0"
          value={trackProgress}
          max={duration ? duration : `${duration}`}
          className="audioProgress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
      </div>
      <AudioVisualizer />
      <div className="music-player-container">
        <img
          src={`./assets/characters/${charName}/${charName}_Frame.webp`}
          alt=""
        />
        <div className="music-player-text">
          <div className="music-player-text-container">
            <p className="music-title">{mainData["songs"][songIndex].name}</p>
            <p className="music-description">{charName + "'s Theme"}</p>{" "}
          </div>
          <div className="music-icons">
            <img
              src={`./assets/icons/${muted ? "play" : "pause"}.png`}
              onClick={volumeMute}
              alt=""
            />
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
            <img
              src={`./assets/icons/${!replay ? "replay" : "replayToggle"}.png`}
              onClick={onReplay}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
