import React from "react";
import MainData from "../data.json";
import DailyItem from "./DailyItem";
import ServerTime from "./ServerTime";

const OptionBar = (props) => {
  //[DAILY][TYPE][REGION ID][Character / Label AKA Farm][Day from Computed Data]
  const audioPlayer = new Audio();
  const [region, setRegion] = React.useState(0);
  const [comStatus, setComStatus] = React.useState(false);
  const [webStatus, setWebStatus] = React.useState(false);
  const [currentDay, setCurrentDay] = React.useState(0);

  const onCommission = () => {
    if (!comStatus) {
      setComStatus(true);
    }
    reminderClicked();
  };

  const onWebdaily = () => {
    if (!webStatus) {
      setWebStatus(true);
    }
    reminderClicked();
  };

  React.useEffect(() => {
    if (webStatus === true && comStatus === true) {
      localStorage.setItem("commission-genshin-02", JSON.stringify(new Date()));
    }
  }, [comStatus, webStatus]);

  const paimonClicked = () => {
    audioPlayer.src = "./assets/audios/Nandayo.mp3";
    audioPlayer.volume = 0.3;
    audioPlayer.play();
  };

  const reminderClicked = () => {
    audioPlayer.src = "./assets/audios/reminder.mp3";
    audioPlayer.volume = 0.4;
    audioPlayer.play();
  };

  React.useEffect(() => {
    const d = new Date();
    let day = d.getDay();
    if (day === 1 || day === 4) {
      setCurrentDay(0);
    } else if (day === 2 || day === 5) {
      setCurrentDay(1);
    } else if (day === 3 || day === 6) {
      setCurrentDay(2);
    } else if (day === 0) {
      setCurrentDay(4);
    }
    if (localStorage.getItem("commission-genshin-02")) {
      const comDate = Date.parse(
        JSON.parse(localStorage.getItem("commission-genshin-02"))
      );
      console.log(Math.abs(d - comDate));
      if (Math.abs(d - comDate) > 60000) {
        setComStatus(false);
        setWebStatus(false);
        localStorage.removeItem("commission-genshin-02");
      } else {
        setComStatus(true);
        setWebStatus(true);
      }
    } else {
      setComStatus(false);
      setWebStatus(false);
    }
  }, []);

  const handleRegion = (e) => {
    setRegion(e);
    audioPlayer.src = "./assets/audios/option.mp3";
    audioPlayer.volume = 0.4;
    audioPlayer.play();
  };

  return (
    <div className="option-bar-container">
      <div className="option-bar">
        <div className="option-bar-icons">
          <div className="option-bar-icons-container">
            <img
              style={{ marginTop: "35px" }}
              className="option-bar-icons-img"
              src="./assets/icons/Anemo.svg"
              alt=""
              onClick={() => handleRegion(0)}
            />
            <img
              className="option-bar-icons-img"
              src="./assets/icons/Geo.svg"
              alt=""
              onClick={() => handleRegion(1)}
            />
            <img
              className="option-bar-icons-img"
              src="./assets/icons/Electro.svg"
              alt=""
              onClick={() => handleRegion(2)}
            />
            <img
              className="option-bar-icons-img"
              src="./assets/icons/Dendro.svg"
              alt=""
              onClick={() => handleRegion(3)}
            />
          </div>
        </div>
        <div className="option-bar-items">
          <div className="option-bar-items-container">
            <div className="option-bar-items-text">
              <p className="genshin-font option-bar-main-text">
                Today's Talent material
              </p>
              <p className="genshin-font option-bar-sub-text">
                {MainData["daily"]["book"][region].name}
              </p>
            </div>
            <div className="option-bar-image-items">
              {currentDay !== 4 ? (
                MainData["daily"]["book"][region].character[currentDay].map(
                  (e, index) => <DailyItem name={e} key={index} />
                )
              ) : (
                <img
                  src="./assets/images/paimon smug.png"
                  onClick={() => paimonClicked()}
                  style={{
                    width: "75%",
                    height: "100%",
                    margin: "auto",
                    opacity: ".9",
                  }}
                  alt=""
                />
              )}
            </div>
            <div className="option-bar-container-2">
              <div className="daily-commission-container">
                <p className="genshin-font">Reminder:</p>
                <div className="daily-commission-items">
                  <img src="./assets/icons/commission.svg" alt="" />
                  <p onClick={onCommission} className="genshin-font">
                    Daily Commissions <br />
                    Status:{" "}
                    <span style={{ color: comStatus ? "#61DD6D" : "#F70000" }}>
                      {comStatus ? "Completed" : "Unfinished"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="daily-commission-container">
                <div className="daily-commission-items">
                  <img src="./assets/icons/web-daily.png" alt="" />
                  <p className="genshin-font" onClick={onWebdaily}>
                    Daily WebLogin <br />
                    Status:{" "}
                    <span style={{ color: webStatus ? "#61DD6D" : "#F70000" }}>
                      {webStatus ? "Completed" : "Unfinished"}
                    </span>
                  </p>
                </div>
              </div>
              <div onClick={() => reminderClicked()}>
                <ServerTime
                  handleServer={props.handleServer}
                  serverTime={props.serverTime}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionBar;
