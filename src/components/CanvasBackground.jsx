import React from "react";
import petalImage from "../fonts/petal.png";

const CanvasBackground = (props) => {
  const canvasRef = React.useRef();
  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    function PetalAnim() {
      const TOTAL = 50;
      const petalArray = [];
      const petalImg = new Image();
      petalImg.src = petalImage;

      // Petal class
      class Petal {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height * 2 - canvas.height;
          this.w = 25 + Math.random() * 15;
          this.h = 20 + Math.random() * 10;
          this.opacity = 0.7;
          this.flip = Math.random();

          this.xSpeed = 1.5 + Math.random() * 2;
          this.ySpeed = 1 + Math.random() * 1;
          this.flipSpeed = Math.random() * 0.03;
        }

        draw() {
          if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -petalImg.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flip = Math.random();
          }
          ctx.globalAlpha = this.opacity;
          ctx.drawImage(
            petalImg,
            this.x,
            this.y,
            this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
            this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
          );
        }

        animate() {
          this.x += this.xSpeed + mouseX * 5;
          this.y += this.ySpeed + mouseX * 2;
          this.flip += this.flipSpeed;
          this.draw();
        }
      }

      const petalLoad = () => {
        for (let i = 0; i < TOTAL; i++) {
          petalArray.push(new Petal());
        }
        render();
      };

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalArray.forEach((petal) => petal.animate());
        window.requestAnimationFrame(render);
      }

      let mouseX = 0;
      function touchHandler(e) {
        mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
      }
      petalLoad();
      window.addEventListener("mousemove", touchHandler);
      window.addEventListener("touchmove", touchHandler);
    }

    function animateRain() {
      ctx.globalAlpha = 0.65;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.lineCap = "round";

      let w = window.innerWidth;
      let h = window.innerHeight;
      var init = [];
      var maxParts = 500;
      for (var a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          l: 1 + Math.random() * 2,
          xs: -4 + Math.random() * 4,
          ys: Math.random() * 10 + 10,
        });
      }

      var particles = [];
      for (var b = 0; b < maxParts; b++) {
        particles[b] = init[b];
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        for (var c = 0; c < particles.length; c++) {
          var p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      }

      function move() {
        for (var b = 0; b < particles.length; b++) {
          var p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -20;
          }
        }
      }

      setInterval(draw, 30);
    }
    if (props.canvasId === 1) {
      animateRain();
    } else if (props.canvasId === 2) {
      PetalAnim();
    }
  }, [props.canvasId]);

  return <canvas ref={canvasRef} style={{ position: "absolute" }} />;
};

export default CanvasBackground;
