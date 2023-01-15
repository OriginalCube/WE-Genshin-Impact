import React from "react";

const AudioVisualizer = () => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.3;
    canvas.height = window.innerHeight * 0.2;
    let ctx = canvas.getContext("2d");
    function wallpaperAudioListener(audioArray) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Render bars along the full width of the canvas
      var barWidth = canvas.width / audioArray.length;
      var halfCount = audioArray.length / 2;
      // Begin with the left channel in red
      ctx.fillStyle = `white`;
      var tempHeight = canvas.height * 0.85;
      // Iterate over the first 64 array elements (0 - 63) for the left channel audio data
      for (let i = 0; i < halfCount; ++i) {
        // Create an audio bar with its hight depending on the audio volume level of the current frequency
        var height = tempHeight * Math.min(audioArray[i], 1);
        ctx.globalAlpha = 0.7;
        ctx.fillRect(
          barWidth * i * 2 + 2,
          canvas.height - height,
          barWidth,
          height
        );
      }
    }
    try {
      window.wallpaperRegisterAudioListener(wallpaperAudioListener);
    } catch (e) {}
  }, []);
  return <canvas ref={canvasRef} style={{ borderBottom: "2px solid white" }} />;
};

export default AudioVisualizer;
