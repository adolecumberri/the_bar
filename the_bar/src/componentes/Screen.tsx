import { FC, useEffect, useState, useContext, useCallback, useRef } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { useWindowSize } from "../hooks";

import { ICrew, IGridHash, IPixelSize, ITheme } from "../interfaces";
import { Bar } from ".";
import { StyleContext } from "../utility";
import { THEME, DELAYS } from "../constants/constants";
import BarEntry from "./BarEntry";
import { Grid } from "../classes/Grid";
import Debugger from "./Debugger";
import { createHero, createCrew, rand } from "../utility/Utility";
import useInterval from "../hooks/useInterval";
import { Crew } from "../classes/Crew";

const useStyles = makeStyles((theme: ITheme) => ({
  screen: {
    width: "80%",
    height: "80%",
    border: "1px solid black",
  },
  topRow: {
    display: "flex",
    height: "20%",
  },
  bottomRow: {
    display: "flex",
    height: "80%",
  },
}));

const Screen: FC = () => {
  const { screen, topRow, bottomRow } = useStyles();

  const { canvasHeight, canvasWidth } = useContext(StyleContext);

  const [windowWidth, windowHeight] = useWindowSize();

  const [pixelSize, setPixelSize] = useState(pixelSizeQuery(windowWidth));
  const [themeState, setThemeState] = useState(THEME);

  const [triggerRender, setTriggerRender] = useState(false); //Trigger a canvas render

  const [barGrid, setBarGrid] = useState<Grid>(new Grid());

  //------CREWS.----------
  //TODO: metería esto en un hook personalizado, que creo que puede ser 
  // una clase ES6 pero mucho mas flexible en el paradigma de react. 
  const { MAX_CREW_CREATION_DELAY, MIN_CREW_CREATION_DELAY, ENTER_DELAY } = DELAYS;


  const [crewsGone, setCrewsGone] = useState<Crew[]>([]);
  const [crewsInside, setCrewsInside] = useState<Crew[]>([]);
  const [crewsAtDoor, setCrewsAtDoor] = useState<Crew[]>([]);
  // let {current: timesTryingToEnter} = useRef(0);
  let [timesTryingToEnter, setTimesTryingToEnter] = useState(0);

  //DELAYS
  const [goToEntryDelay, setGoToEntryDelay] = useState(MIN_CREW_CREATION_DELAY);
  const [checkEnterDelay, setCheckEnterDelay] = useState(ENTER_DELAY);
  // const [intervalFlag, setIntervalFlag] = useState<boolean | null>(true); //TODO: unused
  const create = useCallback(createCrew, []);

  const [randomGuy, setRandomGuy] = useState<any>();

  //set pixelSize
  useEffect(() => {
    // debugger;
    //hay un bug, que windowWidth se lee como 0
    let newPixelSize = pixelSizeQuery(!!windowWidth ? windowWidth : window.innerWidth);
    if (newPixelSize !== pixelSize) {
      setPixelSize(newPixelSize);
    }
  }, [windowWidth]);

  //set theme state
  useEffect(() => {
    setThemeState({ ...THEME, pixelSize });
  }, [pixelSize]);

  //grid initializer
  useEffect(() => {
    let rows = 6,
      cols = 16,
      t_width = canvasWidth * pixelSize,
      t_height = canvasHeight * pixelSize;

    let grid = new Grid();
    grid._initNewGridWithTables({ rows, cols, t_width, t_height });

    setBarGrid(grid);
  }, [pixelSize]);

  //when crewsAtDoor changes, re-starts delay used in the interval of creation.
  useEffect(() => {
    if (crewsAtDoor.length < 5) {
      setGoToEntryDelay(rand(MAX_CREW_CREATION_DELAY, MIN_CREW_CREATION_DELAY));
    }
//Reinicio el checkEnterDelay si esta a 0
    if( checkEnterDelay !== ENTER_DELAY) setCheckEnterDelay(ENTER_DELAY);
  }, [crewsAtDoor.length])

  useInterval(() => {
    //No hay mesass? paro la llegada a la puerta
    if(barGrid.getFreeTables().length === 0){
      setGoToEntryDelay(0)
      return;
    }

    if (crewsAtDoor.length < 5) {
      setCrewsAtDoor([...crewsAtDoor, create()]);
      //delay random desde el minimo hasta el máximo tiempo de creación
      setGoToEntryDelay(rand(MAX_CREW_CREATION_DELAY, MIN_CREW_CREATION_DELAY));
    } else if( crewsAtDoor.length === 5){
      setGoToEntryDelay(0);
    } 
  }, goToEntryDelay);

  useInterval(() => {
    if (crewsAtDoor.length === 0) setCheckEnterDelay(0);

    let crewToEnter = crewsAtDoor[0];
    let freeTables = barGrid.getFreeTablesBySize(crewToEnter?.heroNum);


    if (freeTables.length === 0 && timesTryingToEnter === 3) {
      //No hay mesas y lo intentan 3 veces. El equipo se va.
      console.log("3 veces");
      const crewGone = crewsAtDoor.shift();
      setCrewsGone( [...crewsGone, crewGone as Crew]);
      setCrewsAtDoor( [ ...crewsAtDoor ]);
    } else if (freeTables.length === 0) {

      //no hay mesas. intentos +1
      setTimesTryingToEnter(timesTryingToEnter + 1);
      console.log("intentando: " + timesTryingToEnter);

    } else if (freeTables.length > 0) {
      //hay mesa. el equipo entra

      console.log("puedo entrar.", freeTables[0]);
      freeTables[0].occupyTable(crewToEnter);
      const crewGone = crewsAtDoor.shift();
      setCrewsInside( [...crewsInside, crewGone as Crew]);
      setCrewsAtDoor( [ ...crewsAtDoor ]);
      // debugger;
    }
  }, checkEnterDelay);



  return (
    <>
      <StyleContext.Provider value={themeState}>
        <Debugger
          highlightChairs={() => {
            barGrid?.highlight("chair");
            setTriggerRender(!triggerRender);
            // setBarGrid(new Grid(barGrid?.hashGrid));
          }}
          highlightTables={() => {
            barGrid?.highlight("table");
            setTriggerRender(!triggerRender);
            // setBarGrid(new Grid(barGrid?.hashGrid));
          }}
          stopHighlighting={() => {
            barGrid?.stopHighlighting();
            setTriggerRender(!triggerRender);
            // setBarGrid(new Grid(barGrid?.hashGrid));
          }}
          delay={goToEntryDelay}
          enterDelay = {checkEnterDelay}
          tables={barGrid.hashGrid && barGrid.getFreeTables()}
          crewsGone = {crewsGone.length}
          crewsInside =  {crewsInside.length}
          crewsInQueue = { crewsAtDoor.length}
        />
        <BarEntry crewsAtDoor={crewsAtDoor} />
        <Bar
          barGrid={barGrid as Grid}
          triggerRender={triggerRender}
        // executeRenderLoop={executeRenderLoop}
        />
      </StyleContext.Provider>
    </>
  );
};

const pixelSizeQuery: (a: number) => IPixelSize = (windowWidth: number) => {
  let solution: IPixelSize = 1;
  if (windowWidth >= 1920) {
    solution = 4;
  } else if (windowWidth >= 1280) {
    solution = 3;
  } else if (windowWidth >= 980) {
    solution = 2;
  } else if (windowWidth <= 650) {
    solution = 1;
  }

  return solution;
}
export default Screen;



