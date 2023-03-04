import React from "react";

const SongItem = (props) => {
  return (
    <div className="song-item" onClick={() => props.onChangeId(props.id)}>
      <div className="song-image">
        <img
          src={`./assets/characters/${props.charName}/${props.charName}_Frame.webp`}
          alt=""
        />
      </div>
      <div className="song-text">
        <p className="genshin-font song-title ">{props.name}</p>{" "}
        <p className="genshin-font song-sub ">{props.charName}'s theme</p>
      </div>
    </div>
  );
};

export default SongItem;
