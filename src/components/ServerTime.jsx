import React from "react";

const ServerTime = (props) => {
  const [time, setTime] = React.useState("00:00");
  let region = [
    { name: "Asia", zone: "Asia/Manila" },
    { name: "North America", zone: "America/New_York" },
    { name: "Europe", zone: "Europe/Paris" },
  ];

  React.useEffect(() => {
    let Interval = setInterval(() => {
      let tempDate = new Date().toLocaleTimeString(
        "en-US",
        {
          timeZone: region[props.serverTime].zone,
          hour: "2-digit",
          minute: "2-digit",
        },
        {}
      );
      setTime(tempDate);
    }, 1000);
    return () => {
      clearInterval(Interval);
    };
  }, [props.serverTime]);

  return (
    <div className="server-time-container" onClick={props.handleServer}>
      <p className="genshin-font server-sub-text">Server Time</p>
      <p className="genshin-font server-time">{time}</p>
      <p className="genshin-font server-sub-text">
        {region[props.serverTime].name}
      </p>
    </div>
  );
};

export default ServerTime;
