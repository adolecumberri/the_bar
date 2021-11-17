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
  barGrid: Grid;
  missionManager: MissionManager;
  // // showInToolTip: Dispatch<SetStateAction<ReactNode>>,
  showInToolTip: any;
  crewsInside: Crew[];
  setCrewsInside: React.Dispatch<React.SetStateAction<Crew[]>>
}

const Bar: FC<IBarProps> = ({
  barGrid: { hashGrid: barGrid },
  missionManager: { missions_displayed },
  showInToolTip,
  crewsInside,
  // triggerRender,
}) => {
  const { container, counter } = useStyles();

  const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);

  const [count] = useRenderCounter();

  //no tiene mucho sentido este barGrid como condicion de renderizado.
  // useEffect(() => {
  //     _drawGrid();
  // }, [barGrid]);


  const loadChairTooltip = useCallback((chair: Chair) =>
    <>
      <div key={`tooltip-${chair.key}`}>

        <div>
          Chair.   <br />
          key: {chair.key} <br />
          chairId: {chair.id} <br />
          tableId:   {chair.tableId} <br />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>
            x distance: {chair.x}
          </span>
          <span>
            y distance: {chair.y}
          </span>
          <span>
            x coord: {chair.xCoord}
          </span>
          <span>
            y coord: {chair.yCoord}
          </span>
          <span>

          </span>

        </div>

      </div>
    </>, []);

  const loadTableTooltip = useCallback((table: Table) =>
    <>
      <div key={`tooltip-${table.key}`}>

        <div>
          Chair.   <br />
          key: {table.key} <br />
          chairId: {table.tableId} <br />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>
            Crew Sitted: {!!table.crew ? "yes" : "no"}
          </span>

          <span>
            x distance: {table.x}
          </span>
          <span>
            y distance: {table.y}
          </span>
          <span>
            x coord: {table.xCoord}
          </span>
          <span>
            y coord: {table.yCoord}
          </span>

          {table.chairs.map((chair: Chair) => <>

            <div style={{ marginLeft: "16px" }}>
              {loadChairTooltip(chair)}
            </div><br />
          </>
          )}
        </div>
      </div>
    </>, [loadChairTooltip]);

  const loadHeroTooltip = useCallback((hero: IHero) =>
    <>
      <div key={`tooltip-${hero.key}`}>

        <div>
          {hero.name} {hero.surname}
        </div>
        <div>
          {hero.className}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>
            hp: {hero.hp}
          </span>
          <span>
            dmg: {hero.dmg}
          </span>
          <span>
            crit: {hero.crit}
          </span>
          <span>
            critDmg: {hero.critDmg}
          </span>
          <span>
            def: {hero.def}
          </span>
          <span>
            accuracy: {hero.accuracy}
          </span>
          <span>
            evasion: {hero.evasion}
          </span>
          <span>
            att_interval: {hero.att_interval}
          </span>
          <span>
            reg: {hero.reg}
          </span>
        </div>

      </div>
    </>
    , []);

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
            // onMouseOut={() => { showInToolTip(undefined) }}
          >
          </div >
        );

        // el propio jsx.element necesita una key en las propiedades.
        // div.props["key"] = `mission-container-${i}`
        solution.push(div);
      });

      return solution;
    }
    , [missions_displayed.length, pixelSize, showInToolTip]);



  /* recursively draw each grid object */
  const _drawGrid = () => {
    let solution = [];

    for (let coord in barGrid) {

      let divStyle = {
        position: "absolute",
        width: barGrid[coord].width,
        height: barGrid[coord].height,
        top: barGrid[coord].y,
        left: barGrid[coord].x,
        border: "1px solid #bbbbbb",
        imageRendering: "pixelated",
      };
      let div: JSX.Element;

      // Void | Chair | Table
      switch (barGrid[coord].type) {
        case "void":
          div = (
            <div key={`table-${coord}`} className="" style={{ ...divStyle } as any} />
          );
          break;

        case "chair": {
          let thisChair = barGrid[coord] as Chair;

          let toolTip = loadChairTooltip(thisChair);
          div = (
            <div
              key={`table-${coord}`}
              className=""
              style={
                {
                  ...divStyle,
                  backgroundColor: barGrid[coord].color
                } as any
              }
              onMouseOver={() => { showInToolTip(toolTip) }}
              onMouseOut={() => { showInToolTip(undefined) }}
            />
          );
        }

          break;

        case "table": {
          let thisTable = barGrid[coord] as Table;
          let toolTip = loadTableTooltip(thisTable);

          div = (
            <div
              key={`table-${coord}`}
              className=""
              style={
                {
                  ...divStyle,
                  backgroundColor: barGrid[coord].color
                } as any
              }
              onMouseOver={() => { showInToolTip(toolTip) }}
              onMouseOut={() => { showInToolTip(undefined) }}
            >
              <span>{(barGrid[coord] as Table).tableId}</span>
            </div>
          );
        }
          break;
      }

      solution.push(div);
    }

    return solution;
  };


  const _drawHeros = () => {
    let solution: JSX.Element[] = [];



    crewsInside.forEach(crew => {

      crew.heros.forEach(hero => {
        //el grid que esta bajo la imagen del hero.
        let correspondantGrid = barGrid[`${hero.coords.xCoord}-${hero.coords.yCoord}`];
        let divStyle = {
          position: "absolute",
          width: correspondantGrid.width,
          height: correspondantGrid.height,
          top: hero.coords.y,
          left: hero.coords.x,
          border: "1px solid #bbbbbb",
          imageRendering: "pixelated",
        };

        //silla ocupada
        if (!hero) debugger;
        let toolTip = loadHeroTooltip(hero);
        solution.push((<div key={`hero-${hero.id}`}>
          <div
            key={`table-${crew.coords.x}-${crew.coords.y}`}
            className=""
            style={
              {
                ...divStyle,
                overflow: "hidden",
              } as any
            }
          >
            <img
              key={`img-${hero.id}`}
              alt={`${hero.name}-${hero.surname}`}
              src={(hero.img?.img as HTMLImageElement).src}
              style={{
                height: "100%",
                position: "absolute",
                animation: `iddle-${(correspondantGrid as Chair).dir} 1s steps(${hero.img.steps}) infinite`,
                // transform: thisChair.dir === "right" ? 'scaleX(-1)' : undefined,
              }}
              onMouseOver={() => { showInToolTip(toolTip) }}
              onMouseOut={() => { showInToolTip(undefined) }}
            />

          </div>
        </div>
        ));
      })
    })

    return solution;
  }
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
        {_drawHeros()}
      </div>
    </>
  );
};

export default Bar;
