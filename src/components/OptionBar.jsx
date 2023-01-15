import React from "react";
import MainData from "../data.json";

const OptionBar = () => {
  //[DAILY][TYPE][REGION ID][Character / Label AKA Farm][Day from Computed Data]
  return (
    <div className="option-bar-container">
      <div className="option-bar">
        <div className="option-bar-icons">
          <div className="option-bar-icons-container">
            <img
              style={{ marginTop: "35px" }}
              className="option-bar-icons-img"
              src="./assets/icons/artifact.png"
              alt=""
            />
            <img
              className="option-bar-icons-img"
              src="./assets/icons/wish.png"
              alt=""
            />
            <img
              className="option-bar-icons-img"
              src="./assets/icons/Inazuma.png"
              alt=""
            />
            <img
              className="option-bar-icons-img"
              src="./assets/icons/Sumeru.png"
              alt=""
            />
          </div>
        </div>
        <div className="option-bar-items">
          <div className="option-bar-items-container">
            <div className="option-bar-items-text">
              <p className="genshin-font option-bar-main-text">
                Today's Talent material
              </p>
              <p className="genshin-font option-bar-sub-text">Sub Text Area</p>
            </div>
            <div className="option-bar-image-items"></div>
            <div
              className="option-bar-items-text"
              style={{ marginTop: "25px" }}
            >
              <p className="genshin-font option-bar-main-text">
                Today's Talent material
              </p>
              <p className="genshin-font option-bar-sub-text">Sub Text Area</p>
            </div>
            <div className="option-bar-image-items"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionBar;
