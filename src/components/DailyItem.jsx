import React from "react";

const DailyItem = (props) => {
  return (
    <div className="option-bar-images-container">
      <img
        src={`./assets/characters/${props.name}/${props.name}_Icon.webp`}
        alt=""
      />
      <p className="character-name genshin-font">{props.name}</p>
    </div>
  );
};

export default DailyItem;
