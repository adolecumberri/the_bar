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
import { BarContext, StyleContext } from "../utility";
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
  setBarCtx: Dispatch<SetStateAction<CanvasRenderingContext2D | undefined>>;
}

const Bar: FC<IBarProps> = (props) => {
  const { setBarCtx } = props;
  const { container, counter } = useStyles();

  const { pixelSize } = useContext(StyleContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameId = useRef(-1); //Para poder parar las animaciones. cancelAnimationFrame(frameId);

  const [count] = useRenderCounter();

  const [barGrid, setBarGrid] = useState<any>(); //instanceof

  //Iniciar canvas.
  useEffect(() => {
    setBarCtx(canvasRef.current?.getContext("2d") as CanvasRenderingContext2D);
    
    gridSprites.setAttribute("src", "../sprites/spritesheet.png");
  }, []);

  useEffect(() => {
    // debugger;
    _initializeGameCanvas({
      rows: 16,
      cols: 16,
      t_width: CANVAS_WIDTH * pixelSize,
      t_height: CANVAS_HEIGHT * pixelSize,
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
    let newGrid = grid._initNewGrid({ rows, cols, t_width, t_height });
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
    frameId.current = requestAnimationFrame(_renderLoop);
  }

  /* recursively draw each grid object */
  // drawGrid = () => { for (let coord in this.gridHash) this._drawBox('grid', this.gridHash[coord]) }
  function _drawGrid() {
    // debugger;
    
    // debugger;
    for (let coord in barGrid) {
      _drawBox("void", barGrid[coord]);
    }
  };

  // const _drawBox = () => {
  //   console.log("estamos");
  // }

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
        ctx.fillRect(box.x, box.y, box.width, box.height);
        ctx.drawImage(
          gridSprites,
          box.sprite.x,
          box.sprite.y,
          box.sprite.width,
          box.sprite.height,
          box.x,
          box.y,
          box.width,
          box.height
        );
        return;

      case "chair":
        return;

      case "table":
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
