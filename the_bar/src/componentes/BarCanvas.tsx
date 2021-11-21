//Barra del bar

import React, {
  FC,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useState,
} from "react";

//Material UI
import { makeStyles, useTheme } from "@material-ui/styles";

import { THEME } from "../constants/constants";
import { IAnyBox, IGridHash, ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/constants";
import { useRenderCounter } from "../hooks";
import { StyleContext } from "../utility";
import { Grid } from "../classes/Grid";

const useStyles = makeStyles((tema: ITheme) => {
  console.log(tema);
  return {
    container: {
      backgroundColor: "burlywood",
    },
    counter: {
      position: "absolute",
    },
  };
});

interface IBarCanvasProps {
  barGrid: Grid;
  triggerRender: boolean;
  executeRenderLoop?: any; //TODO: Experimental
}

const BarCanvas: FC<IBarCanvasProps> = ({ barGrid: { hashGrid: barGrid }, triggerRender }) => {
  const { container, counter } = useStyles();

  const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);
  // const { barTile } = useContext(ImagesContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameId = useRef(-1); //Para poder parar las animaciones. cancelAnimationFrame(frameId);

  const [count] = useRenderCounter();

  useEffect(() => {
    _renderLoop();
  }, [triggerRender]);


  useEffect(() => {
    _renderLoop();
    console.log("holaa-render");
  }, [barGrid]);

  function _renderLoop() {
    let canvas = canvasRef.current as HTMLCanvasElement;
    let ctx = canvasRef.current?.getContext("2d") as CanvasRenderingContext2D;
    // console.log(ctx);

    //TODO: checkear si puedo pintar solo una vez el mapa y dejarlo así.
    //reseteo el rectangulo
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    // debugger;
    _drawGrid();
    // frameId.current = requestAnimationFrame(_renderLoop); //TODO: puedo prescindir de el todavía.
  }

  /* recursively draw each grid object */
  function _drawGrid() {
    for (let coord in barGrid) {
      _drawBox(barGrid[coord].type, barGrid[coord]);
    }
  };

  /* function to draw individual game objects (square) to the canvas */
  function _drawBox(type: string, box: IAnyBox): void {
    let ctx: CanvasRenderingContext2D = canvasRef.current?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    // debugger;
    //Tipos: void, chair, table y hero
    switch (type) {
      case "void":
        // debugger;
        // ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        // debugger;
        // if(ctx === undefined){
        //   debugger;
        // }
        // ctx.drawImage(
        //   barTile.img,
        //   box.sprite.x,
        //   box.sprite.y,
        //   box.sprite.width,
        //   box.sprite.height,
        //   box.x,
        //   box.y,
        //   box.width,
        //   box.height
        // );
        return;

      case "chair":
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.fillStyle = box.color;
        ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        return;

      case "table":
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.fillStyle = box.color;
        ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        return;

      case "hero":
        return;
    }
  };

  if (pixelSize) console.log(CANVAS_WIDTH, CANVAS_HEIGHT, pixelSize);
  return (

    <>
      {/* {console.log(theme)} */}
      <canvas
        id="canvas"
        ref={canvasRef}
        className={container}
        width={canvasWidth * pixelSize}
        height={canvasHeight * pixelSize}
      />
      <span className={counter}>{count}</span>
    </>
  );
};

export default BarCanvas;
