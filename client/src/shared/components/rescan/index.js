// Library Imports
import React, { useRef, useEffect, useContext } from "react";
import { ThemeContext } from "styled-components";

// Relative Imports
import { Container, Instructions, Image, Canvas } from "./styles";
import { Information } from "../../../assets/styles/type.js";

const Rescan = ({ isLoading }) => {
  const canvasRef = useRef(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = 180;

    ctx.font = "14px Inter-Regular";
    ctx.fillStyle = `${theme.type.secondary}`;

    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    const rows = Math.floor(canvas.height / fontSize);

    const binChars = ["0", "1"];
    const bits = [];
    const bitHeight = fontSize;
    const bitWidth = fontSize;

    // Populate array of 'bits'
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        bits.push({
          x: c * bitWidth,
          y: r * bitHeight,
          value: binChars[Math.floor(Math.random() * binChars.length)],
          hasDrawn: false,
        });
      }
    }

    // Vars for manually calculating frame rate
    const fps = 10;
    const interval = 1000 / fps;
    let now;
    let then = Date.now();
    let delta;

    // Draw all bits once before starting animation
    for (let bit of bits) {
      ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
      ctx.fillText(bit.value, bit.x, bit.y + bitHeight);
      bit.hasDrawn = true;
    }

    function draw() {
      raf = window.requestAnimationFrame(draw);
      now = Date.now();
      delta = now - then;

      if (delta > interval) {
        for (let bit of bits) {
          if (bit.hasDrawn === true && Math.random() * 100 > 95) {
            // If passes the randomness check
            let newVal = bit.value === binChars[1] ? binChars[0] : binChars[1];

            ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
            ctx.fillText(newVal, bit.x, bit.y + bitHeight);
            bit.value = newVal;
          }
        }
        then = now - (delta % interval);
      }
    }
    draw();
  }, [isLoading]);

  return (
    <Container>
      <Image>
        <Canvas ref={canvasRef} />
      </Image>
      <Instructions>
        <Information>
          Refreshing your vault will force it to rescan the blockchain. This
          process detects and clears stuck transactions but also prevents you
          from using the vault until it is complete. To begin the process click
          the 'Refresh' button.
        </Information>
      </Instructions>
    </Container>
  );
};

export default Rescan;
