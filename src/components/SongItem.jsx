import React from "react";

const SongItem = (props) => {
  return (
    <div className="song-item">
      <div className="song-image"></div>
      <div className="song-text">
        <p className="genshin-font">
          {props.id + 1}. {props.name}
        </p>{" "}
      </div>
    </div>
  );
};

export default SongItem;
