//Barra del bar

import React, {
  FC,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

//Material UI
import { makeStyles, useTheme } from "@material-ui/styles";

import { THEME, TILE_SIZE } from "../constants/constants";
import { IAnyBox, IGridHash, IGridTable, IMission, ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/constants";
import { useRenderCounter } from "../hooks";
import { StyleContext, ImagesContext } from "../utility";
import { Grid } from "../classes/Grid";
import { Chair, Table } from "../classes/GridBoxesTypes";
import { rand } from "../utility/Utility";
import { MissionManager } from "../classes/Missions";

const gridSprites = new Image();
gridSprites.setAttribute("src", "../sprites/spritesheet.png");
// window.onload = function() {
//   debugger;
//   gridSprites.setAttribute("src", "../sprites/spritesheet.png");
// }

const useStyles = makeStyles((tema: ITheme) => {
  return {
    container: {
      backgroundColor: "burlywood",
    },
    counter: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
  };
});

interface IBarProps {
  barGrid: Grid;
  missionManager: MissionManager;
  // triggerRender: boolean;
  // executeRenderLoop?: any; //TODO: Experimental
}

const Bar: FC<IBarProps> = ({
  barGrid: { hashGrid: barGrid, triggerUpdate },
  missionManager: { missions_displayed },
  // triggerRender,
}) => {
  const { container, counter } = useStyles();

  const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);
  // const { barTile } = useContext(ImagesContext);

  const [hover, setHover] = useState(false);
  const divDisplay = {
    display: hover ? 'block' : 'none',
    color: "#000000",
  };
  const handleMouseIn = () => {
    setHover(true);
  }
  
  const handleMouseOut = () => {
    setHover(false);
  }
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const frameId = useRef(-1); //Para poder parar las animaciones. cancelAnimationFrame(frameId);

  const [count] = useRenderCounter();

  // useEffect(() => {
  //     _drawGrid();
  // }, [barGrid, triggerRender]);

  const _drawMissions = () => {
    let solution: JSX.Element[] = [];

    missions_displayed.forEach((m, i) => {
      let divStyle = {
        boxSizing: "border-box",
        mozBoxSizing: "border-box",
        webkitBoxSizing: "border-box",
        position: "absolute",
        width: `${TILE_SIZE * pixelSize}px`,
        height: `${TILE_SIZE * pixelSize}px`,
        top: `${(TILE_SIZE * pixelSize) * (m.location?.x as number)}px`, // Math.floor(rand(1))
        left: `${(TILE_SIZE * pixelSize) * (m.location?.y as number)}px`, // Math.floor(rand(10, 5))
        backgroundColor: "gold",
        border: "1px solid #bbbbbb",
        imageRendering: "pixelated",
      };
      let div = (<>
        <div
          key={`mission-${i}`}
          className=""
          style={{ ...divStyle } as any}
          onMouseOver={handleMouseIn.bind(this)} 
          onMouseOut={handleMouseOut.bind(this)}
        />
        <div style={divDisplay}>this is the tooltip!!</div>
      </>
      );
      solution.push(div);
    });

    return solution;
  }

  /* recursively draw each grid object */
  const _drawGrid = () => {
    let solution = [];
    for (let coord in barGrid) {
      // solution.push(_drawBox(barGrid[coord].type, barGrid[coord]));
      let divStyle = {
        position: "absolute",
        width: barGrid[coord].width,
        height: barGrid[coord].height,
        top: barGrid[coord].y,
        left: barGrid[coord].x,
        border: "1px solid #bbbbbb",
        imageRendering: "pixelated",
      };
      let div: any;

      // Void | Chair | Table
      switch (barGrid[coord].type) {
        case "void":
          // div.props.style['background-color' as any] = box.color;
          div = (
            <div key={`table-${coord}`} className="" style={{ ...divStyle } as any} />
          );
          break;

        case "chair":
          let thisChair = barGrid[coord] as Chair;
          if (thisChair.isOccupied) {
            //silla ocupada
            let hero = thisChair.hero;

            div = (
              <div
                key={`table-${coord}`}
                className=""
                style={
                  {
                    ...divStyle,
                    overflow: "hidden",
                    // position: "relative",
                    // backgroundColor: barGrid[coord].color
                  } as any
                }
              >
                <img
                  key={`img-${coord}`}
                  alt={`${hero?.name}-${hero?.surname}`}
                  src={(hero?.img?.img as HTMLImageElement).src}
                  style={{
                    height: "100%",
                    position: "absolute",
                    animation: `iddle-${thisChair.dir} 1s steps(${hero?.img.steps}) infinite`,
                    // transform: thisChair.dir === "right" ? 'scaleX(-1)' : undefined,
                  }}
                />
              </div>
            );
          } else {
            div = (
              <div
                key={`table-${coord}`}
                className=""
                style={
                  {
                    ...divStyle,
                    backgroundColor: barGrid[coord].color
                  } as any
                } />
            );
          }

          break;

        case "table":
          div = (
            <div
              key={`table-${coord}`}
              className=""
              style={
                {
                  ...divStyle,
                  backgroundColor: barGrid[coord].color
                } as any
              } >
              <span>{(barGrid[coord] as Table).tableId}</span>
            </div>
          );

          break;
      }
      solution.push(div);
    }

    return solution;
  };

  // let missionsDisplayed = useCallback( () => {

  // }, [missions.length, pixelSize])

  return (
    <>
      <div
        id="canvas"
        className={container}
        style={{
          width: `${canvasWidth * pixelSize}px`,
          height: `${canvasHeight * pixelSize}px`,
          position: "relative",
        }}
      >
        <span className={counter}>{count}</span>
        {_drawMissions()}
        {_drawGrid()}
      </div>
    </>
  );
};

export default Bar;
