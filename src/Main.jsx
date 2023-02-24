import React from "react";
import VideoCanvas from "./components/VideoCanvas";
import MusicPlayer from "./components/MusicPlayer";
import OptionBar from "./components/OptionBar";
import Navigation from "./components/Navigation";
import CanvasBackground from "./components/CanvasBackground";
//Notes is available for new implementations

const Main = () => {
  const [mainData, setMainData] = React.useState([]);
  const [backgroundMode, setBackgroundMode] = React.useState(true);
  const [player, setPlayer] = React.useState(true);
  const [option, setOption] = React.useState(true);
  const [navigation, setNavigation] = React.useState(true);
  const [imageData, setImageData] = React.useState([]);
  const [imageId, setImageId] = React.useState(0);
  const [mainImage, setMainImage] = React.useState("");
  const [serverTime, setServerTime] = React.useState(0);
  const [canvasId, setCanvasId] = React.useState(0);
  //Create a local storage to hold 3 Variables. Technically 4 if you include vol but focus on 4.

  const handleOption = () => {
    setOption(!option);
    changeMainData(0, { option: !option });
  };

  const handlePlayer = () => {
    setPlayer(!player);
    changeMainData(1, { player: !player });
  };

  const handleNavigation = () => {
    setNavigation(!navigation);
  };

  const handleCanvas = () => {
    let tempCanvas = 0;
    if (canvasId + 1 <= 2) {
      tempCanvas = canvasId + 1;
    }
    setCanvasId(tempCanvas);
    changeMainData(4, { canvasId: tempCanvas });
  };

  const handleServer = () => {
    let serverId = 0;
    if (serverTime + 1 <= 2) {
      serverId = serverTime + 1;
    }
    setServerTime(serverId);
    changeMainData(3, { server: serverId });
  };

  const changeMainData = (x, y) => {
    let tempData = mainData;
    tempData[x] = y;
    setMainData(tempData);
    localStorage.setItem("genshin-02", JSON.stringify(tempData));
  };

  const handleImageId = () => {
    if (imageId + 1 < imageData.length) {
      setImageId(imageId + 1);
    } else {
      setImageId(0);
    }
  };

  window.wallpaperPropertyListener = {
    userDirectoryFilesAddedOrChanged: function (propertyName, changedFiles) {
      setImageData(changedFiles);
    },
  };

  const handleBackgroundMode = () => {
    setBackgroundMode(!backgroundMode);
    changeMainData(2, { backgroundMode: !backgroundMode });
  };

  React.useEffect(() => {
    if (!Array.isArray(imageData) || !imageData.length) {
      setMainImage("./assets/images/wallpaper_0.png");
    } else {
      setMainImage("file:///" + imageData[imageId]);
    }
  }, [imageData, imageId]);

  React.useEffect(() => {
    if (localStorage.getItem("genshin-02") === null) {
      setOption(true);
      setPlayer(true);
      localStorage.setItem(
        "genshin-02",
        `[{"option":true},{"player":true},{"backgroundMode":true}, {"server":0}, {"canvasId": 0}] `
      );
    } else {
      const tempData = JSON.parse(localStorage.getItem("genshin-02"));
      setMainData(tempData);
      setOption(tempData[0].option);
      setPlayer(tempData[1].player);
      setBackgroundMode(tempData[2].backgroundMode);
      setServerTime(tempData[3].server);
      setCanvasId(tempData[4].canvasId);
    }
  }, []);

  return (
    <div>
      {backgroundMode === false ? <VideoCanvas /> : null}
      {backgroundMode === true ? (
        <img className="image-background" src={mainImage} alt="" />
      ) : null}
      {canvasId > 0 ? <CanvasBackground canvasId={canvasId} /> : null}
      {player ? <MusicPlayer handleImageId={handleImageId} /> : null}
      {option ? (
        <OptionBar handleServer={handleServer} serverTime={serverTime} />
      ) : null}
      {navigation ? (
        <Navigation
          handlePlayer={handlePlayer}
          handleOption={handleOption}
          handleNavigation={handleNavigation}
          handleBackgroundMode={handleBackgroundMode}
          handleCanvas={handleCanvas}
        />
      ) : null}
    </div>
  );
};

export default Main;
