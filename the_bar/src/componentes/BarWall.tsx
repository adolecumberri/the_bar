//Barra del bar

import {
    FC,
    useContext,
    useCallback,
    useEffect,
  } from "react";
  
  //Material UI
  import { makeStyles } from "@material-ui/styles";
  
  import { TILE_SIZE } from "../constants/constants";
  import { useRenderCounter } from "../hooks";
  import { StyleContext } from "../utility";
  import { Grid } from "../classes/Grid";
  import { Chair, Table } from "../classes/GridBoxesTypes";
  import { MissionManager } from "../classes/Missions";
  import { IHero } from "../interfaces/Hero.Interface";
  import { Monster } from "../classes/Monster";
  import { Crew } from "../classes/Crew2";
  import { IMission } from "../interfaces";
  
  const useStyles = makeStyles(() => {
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
    missionManager: MissionManager;
    // // showInToolTip: Dispatch<SetStateAction<ReactNode>>,
    showInToolTip: any;
  }
  
  const BarWall: FC<IBarProps> = ({
    missionManager: { missions_displayed },
    showInToolTip,
  }) => {
    const { container, counter } = useStyles();
    const { pixelSize, canvasHeight, canvasWidth, height, width } = useContext(StyleContext);
  
    const [count] = useRenderCounter();
  
    const loadMissionTooltip = useCallback((m: IMission) =>
      <>
        <div>
          <div
            key={`tooltip-${m.id}`}
            style={{ fontWeight: 700, marginBottom: `${4 * pixelSize}px` }}>
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
                {(f.monsters as Monster[]).map(({ img: { img }, id, name }) =>
                  <img
                    key={`img-${id}`}
                    alt={`${name}`}
                    src={(img as HTMLImageElement).src}
                    style={{
                      height: "100%",
                      // position: "absolute",
                      // animation: `iddle-${thisChair.dir} 1s steps(${hero.img.steps}) infinite`,
                      // transform: thisChair.dir === "right" ? 'scaleX(-1)' : undefined,
                    }}
                    // onMouseOver={() => { showInToolTip(toolTip) }}
                    // onMouseOut={() => { showInToolTip(undefined) }}
                  />)}
              </div>
              return solution;
            })
            }
          </div>
        </div>
      </>
      , [pixelSize, showInToolTip]);
  
    const _drawMissions = useCallback(
      () => {
        let solution: JSX.Element[] = [];
  
        missions_displayed.forEach((m, i) => {
          let toolTip = loadMissionTooltip(m);
  
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
              onMouseOver={() => { showInToolTip(toolTip) }}
              onMouseOut={() => { showInToolTip(undefined) }}
            >
            </div >
          );
  
          // el propio jsx.element necesita una key en las propiedades.
          solution.push(div);
        });
  
        return solution;
      }
      , [missions_displayed.length, pixelSize, showInToolTip]);
  
  
    return (
      <>
        <div
          key="canvas-div"
          id="barWall"
          className={`${container} wallPaper`}
          style={{
            width: `${canvasWidth * pixelSize}px`,
            height: `${width * 2}px`,
            position: "relative",
          }}
        >
          <span className={counter}>{count}</span>
          {_drawMissions()}
        </div>
      </>
    );
  };
  
  export default BarWall;
  