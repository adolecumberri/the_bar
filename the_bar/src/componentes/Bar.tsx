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

import { THEME } from "../constants";
import { IAnyBox, ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { useRenderCounter } from "../hooks";
import { StyleContext, ImagesContext } from "../utility";
import { Grid } from "../classes/Grid";

const gridSprites = new Image();
gridSprites.setAttribute("src", "../sprites/spritesheet.png");
// window.onload = function() {
//   debugger;
//   gridSprites.setAttribute("src", "../sprites/spritesheet.png");
// }

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
  
}

const Bar: FC<IBarProps> = (props) => {
  const { container, counter } = useStyles();

  const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);
  // const { barTile } = useContext(ImagesContext);
 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameId = useRef(-1); //Para poder parar las animaciones. cancelAnimationFrame(frameId);

  const [count] = useRenderCounter();

  const [barGrid, setBarGrid] = useState<any>(); //instanceof

  //Iniciar canvas.
  // useEffect(() => {
  //   setBarCtx(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
    
  //   gridSprites.setAttribute("src", "../sprites/bar_tile.png");
  // }, []);

  useEffect(() => {
    // debugger;
    _initializeGameCanvas({
      rows: 6,
      cols: 16,
      t_width: canvasWidth * pixelSize,
      t_height: canvasHeight * pixelSize,
    });
  }, [pixelSize]);

  const _initializeGameCanvas: (a: {
    rows: number;
    cols: number;
    t_width: number;
    t_height: number;
  }) => void = ({ rows, cols, t_width, t_height }) => {
    //GENERO CANVAS. TODO: que no esté vacio.
    let grid = Grid();
    //grid void
    // let newGrid = grid._initNewVoidGrid({ rows, cols, t_width, t_height });
    //grid With Tables.
    let newGrid = grid._initNewGridWithTables({ rows, cols, t_width, t_height });

    
    setBarGrid(newGrid);
    //Inicio render loop
    
  };

  useEffect( ( )=>{
    _renderLoop();
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
  function _drawBox (type: string, box: IAnyBox) : void {
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

  if(pixelSize) console.log(CANVAS_WIDTH, CANVAS_HEIGHT, pixelSize);
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
