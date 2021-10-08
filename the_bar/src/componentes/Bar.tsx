//Barra del bar

import React, { FC, useRef, Dispatch, SetStateAction, useEffect, useContext, useState} from "react";

//Material UI
import { makeStyles, useTheme } from "@material-ui/styles";

import {THEME} from "../constants";
import { ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { useRenderCounter } from "../hooks";
import { BarContext, StyleContext } from "../utility";
import { Grid } from "../classes/Grid";


const gridSprites = new Image();
gridSprites.src = require('./../sprites/spritesheet.png');

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

interface IBarProps {
  setBarCtx: Dispatch<SetStateAction<CanvasRenderingContext2D | undefined>>;
}

const Bar: FC<IBarProps> = (props) => {
  const { setBarCtx } = props;
  const { container, counter } = useStyles();

  const { pixelSize } = useContext(StyleContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameId = useRef(-1); //Para poder parar las animaciones. cancelAnimationFrame(frameId);

  const [count] = useRenderCounter();

  const [barGrid, setBarGrid] = useState<any>();//instanceof 

  //Iniciar canvas.
  useEffect( () => {
    setBarCtx(canvasRef.current?.getContext('2d') as CanvasRenderingContext2D )
  }, []);

  useEffect( () => {
    _initializeGameCanvas( {
      rows: 16,
      cols: 16,
      t_width: CANVAS_WIDTH * pixelSize,
      t_height: CANVAS_HEIGHT * pixelSize
   });
  }, []);

  const _initializeGameCanvas: (a: {
    rows: number;
    cols: number;
    t_width: number;
    t_height: number;
  }) => void = ({ rows, cols, t_width, t_height }) => {
    
    //GENERO CANVAS. TODO: que no esté vacio.
    let grid = Grid();
    setBarGrid(grid._initNewGrid({ rows, cols, t_width, t_height }));

    //Inicio render loop
    _renderLoop();
  }; 


  function _renderLoop() {
    let canvas = canvasRef.current as HTMLCanvasElement;
    let ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    // console.log(ctx);
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    // _drawGrid();
    frameId.current = requestAnimationFrame(_renderLoop);
  }


  /* recursively draw each grid object */
  // drawGrid = () => { for (let coord in this.gridHash) this._drawBox('grid', this.gridHash[coord]) }
  // const drawGrid2 = () => { 
    
  //   for (let coord in barGrid) {
  //   _drawBox('grid', this.gridHash[coord]) 
  // }
  
  
  // }

  const _drawBox = () => {
    console.log("estamos");
  }

   /* function to draw individual game objects (square) to the canvas */
  //  const _drawBox: (type: string, box: IGridCell) => void = (type, box) => {
  //   let  ctx: CanvasRenderingContext2D = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    
  //    if (!box) return;

  //    switch (type) {
  //      case "floor":
  //       ctx.fillRect(box.x, box.y, box.width, box.height);
  //       ctx.drawImage(gridSprites, box.sprite.x, box.sprite.y, box.sprite.width, box.sprite.height, box.x, box.y, box.width, box.height);
  //        return;
  //      case "hero":
  //        return;

  //      case "chair":
  //        return;

  //      case "table":
  //        return;
  //    }
  //  };

  return (
    <>
      {/* {console.log(theme)} */}
      <canvas
        id="canvas"
        ref={canvasRef}
        className={container}
        width={CANVAS_WIDTH * pixelSize}
        height={CANVAS_HEIGHT * pixelSize}
      />
      <span className={counter}>{count}</span>
    </>
  );
};

export default Bar;


