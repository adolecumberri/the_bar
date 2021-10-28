//Barra del bar

import {
  FC,
  useContext,
  useState,
  useCallback,
  useReducer,
} from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { TILE_SIZE } from "../constants/constants";
import { ITheme } from "../interfaces";
import { useRenderCounter } from "../hooks";
import { StyleContext } from "../utility";
import { Grid } from "../classes/Grid";
import { Chair, Table } from "../classes/GridBoxesTypes";
import { MissionManager } from "../classes/Missions";
import { ToolTip } from ".";

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

  const [hoverMission, setHoverMission] = useState(-1);
  // const divDisplay: CSSProperties  = ;
  const showDiv = (divId: number) => {
    setHoverMission(divId);
  }

  const [hoverHero, setHoverHero] = useReducer( (state: any, action: any) => {
    return action;
  }, -1)

  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const frameId = useRef(-1); //Para poder parar las animaciones. cancelAnimationFrame(frameId);

  const [count] = useRenderCounter();

  // useEffect(() => {
  //     _drawGrid();
  // }, [barGrid, triggerRender]);

  const _drawMissions = useCallback(
    () => {
      let solution: JSX.Element[] = [];

      missions_displayed.forEach((m, i) => {
        let divStyle = {
          boxSizing: "border-box",
          MozBoxSizing: "border-box",
          WebkitBoxSizing: "border-box",
          position: "absolute",
          width: `${TILE_SIZE * pixelSize}px`,
          height: `${TILE_SIZE * pixelSize}px`,
          top: `${(TILE_SIZE * pixelSize) * (m.location?.x as number)}px`, // Math.floor(rand(1))
          left: `${(TILE_SIZE * pixelSize) * (m.location?.y as number)}px`, // Math.floor(rand(10, 5))
          backgroundColor: "gold",
          border: "1px solid #bbbbbb",
          imageRendering: "pixelated",
        };
        let div = (
          <div
            key={`mission-${i}`}
            className=""
            style={{ ...divStyle } as any}
            onMouseOver={() => { showDiv(m.location?.id as number) }}
            onMouseOut={() => { showDiv(-1) }}
          >
            {
              hoverMission === m.location?.id &&
              (
                <ToolTip>    {/* tittle */}
                  <div style={{ fontWeight: 700, marginBottom: `${4 * pixelSize}px` }}>
                    {m.title}
                  </div>
                  <div>
                    {m.details}
                  </div>
                  <div>
                    {m.fights.map(f => {
                      let solution = <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        {f.monsters.map(m => <span>{m}</span>)}
                      </div>
                      return solution;
                    })
                    }
                  </div>
                </ToolTip>
              )
            }
          </div >
        );
        // el propio jsx.element necesita una key en las propiedades.
        // div.props["key"] = `mission-container-${i}`
        solution.push(div);
      });


      // debugger;
      return solution;
    }
    , [missions_displayed.length, hoverMission]);



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
{/* TODO: actualizar heroes y despues crear el tooltip */}
                  {/* {
              hoverHero === hero. &&
                <ToolTip>
                  prueba
                </ToolTip> */}
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
        key="canvas-div"
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
