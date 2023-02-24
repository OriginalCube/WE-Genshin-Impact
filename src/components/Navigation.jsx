import React from "react";

const Navigation = (props) => {
  //Make it start to the right & add the buttons
  let keypress = new Audio();
  const [option, setOption] = React.useState(false);

  const audioClick = (e) => {
    let id = "";
    if (e === 0) {
      id = "menu";
    } else {
      id = "sub menu";
    }
    keypress.src = `./assets/audios/${id}.mp3`;
    keypress.volume = 0.4;
    keypress.play();
  };

  const handleOption = () => {
    setOption(!option);
    audioClick(0);
  };

  const handleNavigation = (e) => {
    if (e === "player") {
      props.handlePlayer();
    } else if (e === "mode") {
      props.handleBackgroundMode();
    } else if (e === "option") {
      props.handleOption();
    } else if (e === "canvas") {
      props.handleCanvas();
    }
    audioClick(1);
  };

  return (
    <>
      {" "}
      <img
        className="navigation-main-button"
        src="./assets/icons/paimon.webp"
        onClick={() => {
          handleOption();
        }}
        alt=""
      />{" "}
      {option ? (
        <div className="navigation">
          <div className="navigation-items">
            <img
              src="./assets/icons/handbook.webp"
              alt=""
              onClick={() => handleNavigation("option")}
            />{" "}
          </div>

          <div className="navigation-items">
            <img
              src="./assets/icons/Icon_Archive.webp"
              alt=""
              onClick={() => handleNavigation("player")}
            />{" "}
          </div>

          <div className="navigation-items">
            <img
              src="./assets/icons/Icon_Event.webp"
              alt=""
              onClick={() => handleNavigation("mode")}
            />{" "}
          </div>

          <div className="navigation-items">
            <img
              src="./assets/icons/Abyss.webp"
              alt=""
              onClick={() => handleNavigation("canvas")}
            />{" "}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navigation;
