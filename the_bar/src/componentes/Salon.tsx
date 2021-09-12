//Barra del bar

import React, { FC, useEffect, useRef } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    width: "80%",
    height: "100%",
    backgroundColor: "burlywood",
  },
}));

let cellSize = 5;
let gameGrid: Cell[] = [];

const Salon: FC = () => {
  const { container } = useStyles();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    
    ctx.lineWidth = 0;
    const handleGameGrid = () => {
      for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
      }
    };

    const render = () => {
      handleGameGrid();
      requestAnimationFrame(render);
    };

    

    const createGrid: (canvas: any, ctx: CanvasRenderingContext2D) => void = (
      canvas,
      ctx
    ) => {
      for (let y = 0; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize) {
          gameGrid.push(new Cell(x, y, ctx));
        }
      }
    };

    createGrid(canvas, ctx);
    console.log(gameGrid);
    render();
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className={container}
      // height="500"
      // width={
      //   window.innerWidth < 900
      //     ? window.innerWidth - 20
      //     : window.innerWidth - (window.innerWidth * 20) / 100
      // }
    />
  );
};

class Cell {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, canvas: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.ctx = canvas;
  }

  draw() {
    // this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export default Salon;
