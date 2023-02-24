import React from "react";

const VideoCanvas = () => {
  const backgroundVideo = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    backgroundVideo.current.play();
    function step() {
      ctx.drawImage(backgroundVideo.current, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(step);
    }
    step();
    return () => {
      cancelAnimationFrame(step);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
      <video
        autoPlay
        muted
        loop
        ref={backgroundVideo}
        style={{ display: "none" }}
      >
        <source src="./assets/videos/background.webm" type="video/webm" />
      </video>{" "}
    </>
  );
};

export default VideoCanvas;
