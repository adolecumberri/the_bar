/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, useContext, useCallback, useReducer, ReactNode, Reducer, useRef } from "react";

//Material UI

import { useWindowSize } from "../hooks";

import { IMission, IPixelSize } from "../interfaces";
import { Bar, ToolTipGlobal } from ".";
import { StyleContext } from "../utility";
import { THEME, CANVAS_COLS, CANVAS_ROWS } from "../constants/constants";
import BarEntry from "./BarEntry";
import { Grid } from "../classes/Grid";
import Debugger from "./Debugger";
import { createCrew, rand } from "../utility/Utility";
import useInterval from "../hooks/useInterval";
import { Crew } from "../classes/Crew";
import { MissionManager } from "../classes/Missions";
import { DelayManager } from '../classes/DelayManager';

// const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
let timer: NodeJS.Timeout | number = 0;
const Screen: FC = () => {

  const { canvasHeight, canvasWidth } = useContext(StyleContext);

  const [windowWidth] = useWindowSize();

  const [pixelSize, setPixelSize] = useState(pixelSizeQuery(windowWidth));
  const [themeState, setThemeState] = useState(THEME);

  // const [triggerRender, setTriggerRender] = useState(false); //Trigger a canvas render

  const [barGrid] = useState<Grid>(new Grid({
    cols: CANVAS_COLS,
    rows: CANVAS_ROWS,
    t_height: canvasHeight * pixelSize,
    t_width: canvasWidth * pixelSize,

  }));

  //------CREWS.----------
  //TODO: metería esto en un hook personalizado, que creo que puede ser 
  // una clase ES6 pero mucho mas flexible en el paradigma de react. 

  // const [intervalsAllowed, setIntervalsAllowed] = useState(true);

  const [crewsGone, setCrewsGone] = useState<Crew[]>([]);
  const [crewsInside, setCrewsInside] = useState<Crew[]>([]);
  const [crewsAtDoor, setCrewsAtDoor] = useState<Crew[]>([]);
  const [crewsAtMission, setCrewsAtMission] = useState<Crew[]>([]);
  // let {current: timesTryingToEnter} = useRef(0);
  let [timesTryingToEnter, setTimesTryingToEnter] = useState(0);

  const [delayManager] = useState(new DelayManager());

  //DELAYS
  const [crewCreationDelay, setCrewCreationDelay] = useState(delayManager.delays.MIN_CREW_CREATION_DELAY);
  const [checkEnterDelay, setCheckEnterDelay] = useState(delayManager.delays.ENTER_DELAY);

  const totalCrewsCreated = useRef(0);
  const totalMissiosnCreated = useRef(0);
  const totalCrewsGone = useRef(0);

  //omito el setter. no re reestructura el mision manager.
  const [missionManager] = useState(new MissionManager(delayManager));

  const [toolTipContent, setToolTipContent] = useState(undefined)

  // const [intervalFlag, setIntervalFlag] = useState<boolean | null>(true); //TODO: unused
  const create = useCallback(
    (
      assignMission: () => IMission,
      liberateTableFromCrew: (tableId: number) => void,
      sendCrewOnAMission: any,
    ) => createCrew(
        assignMission, 
        liberateTableFromCrew, 
        sendCrewOnAMission,
        delayManager
      ),
    []);

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
    let t_width = canvasWidth * pixelSize,
      t_height = canvasHeight * pixelSize;

    // let grid = new Grid();
    barGrid._updateBoxDimensions({ newWidth: t_width, newHeight: t_height });

    // setBarGrid(grid);
  }, [pixelSize]);

  // //when crewsAtDoor changes, re-starts delay used in the interval of creation.
  //when crewsAtDoor chages, re-start or stops delay used to check if a crew enters.
  useEffect(() => {
    // menos de 5 equipos en puerta y mesas libres? activo el timer para crear grupos.
    if (crewsAtDoor.length < 5 && barGrid.getFreeTables().length > 0) {
      setCrewCreationDelay(rand(delayManager.delays.MAX_CREW_CREATION_DELAY, delayManager.delays.MIN_CREW_CREATION_DELAY));
    }

    //no hay crews en la puerta? apago el timer para entrar. sino ro reinicio.
    if (crewsAtDoor.length === 0) {
      setCheckEnterDelay(0);
    } else {
      setCheckEnterDelay(delayManager.delays.ENTER_DELAY);
    }

     //si entro aqui y el checkEnterDelay esta apagado, lo reinicio.
     if (checkEnterDelay !== delayManager.delays.ENTER_DELAY) setCheckEnterDelay(delayManager.delays.ENTER_DELAY);

  }, [crewsAtDoor.length, barGrid.getFreeTables().length]);

  //Mission controller.
  useEffect(() => {
    if (missionManager.missions_displayed.length >= 7) {
      missionManager.stopMissionCreationDelay();
    } else {
      if (delayManager.delays.MISSION_CREATION_DELAY === 0) {
        missionManager.restartMissionCreationDelay();
      }
    }

  }, [missionManager.missions_displayed.length])

  //funcion para Crew, que manda al equipo a la mission.
  const sendCrewOnAMission = useCallback( (crew: Crew) => {
    // Añado la crew a la lista de crews en missiones.
    setCrewsAtMission( [...crewsAtMission, crew]);
    // Filtro la crew de las que estan dentro.
    setCrewsInside( [...crewsInside.filter( c => c.id !== crew.id)] );
  }, [crewsAtMission.length, crewsInside.length]);

  const liberateTableFromCrew = useCallback((tableId: number) => {
    barGrid.liberateTableFromCrew(tableId);
    totalCrewsGone.current++;
    // crewsAtMissions()
  }, [barGrid.getFreeTables().length, crewsInside.length]);

  //funcion pasada al equipo, para asignarles una mision desde el mission Manager
  const assignMission = useCallback(() => {
    //doy una mision
    let missionSelected = missionManager.getMissionDisplayed();
    return missionSelected;
  }, [missionManager.missions_displayed.length, crewsInside.length]);


  //intervalo para añadir equipos a la puerta
  useInterval(() => {
    //No hay mesass? paro la llegada a la puerta
    if (barGrid.getFreeTables().length === 0) {
      setCrewCreationDelay(0)
    } else if (crewsAtDoor.length < 5) {
      setCrewsAtDoor([...crewsAtDoor, 
      create( //crea nuevo grupo en la puerta. Le paso funciones que van en la clase.
        assignMission, 
        liberateTableFromCrew, 
        sendCrewOnAMission
      )]);
      totalCrewsCreated.current++;
      //delay random desde el minimo hasta el máximo tiempo de creación
      setCrewCreationDelay(
        rand(
          delayManager.delays.MAX_CREW_CREATION_DELAY, 
          delayManager.delays.MIN_CREW_CREATION_DELAY
        )
      );
    } else if (crewsAtDoor.length === 5) {
      setCrewCreationDelay(0);
    }
  }, !delayManager.stopped ? crewCreationDelay : 0);

  //intervalo para entrar en el bar
  useInterval(() => {
    if (crewsAtDoor.length === 0) {
      setCheckEnterDelay(0);
      return;
    }

    let crewToEnter = crewsAtDoor[0];
    let freeTables = barGrid.getFreeTablesBySize(crewToEnter?.heroNum);

    if (freeTables.length === 0 && timesTryingToEnter === 3) {
      //No hay mesas y lo intentan 3 veces. El equipo se va.
      const crewGone = crewsAtDoor.shift();
      setCrewsGone([...crewsGone, crewGone as Crew]);
      setCrewsAtDoor([...crewsAtDoor]);
    } else if (freeTables.length === 0) {

      //no hay mesas. intentos +1
      setTimesTryingToEnter(timesTryingToEnter + 1);

    } else if (freeTables.length > 0) {
      //hay mesa. el equipo entra

      //asigno equipo  mesa
      crewToEnter.asignTableByTableId(freeTables[0].tableId);
      //asigno mesa en equipo
      freeTables[0].occupyTable(crewToEnter);
      //Saco el equipo que entra de los grupos en la puerta.
      const crewEntering = crewsAtDoor.shift();
      //añado el equipo a los equipos de dentro.
      setCrewsInside([...crewsInside, crewEntering as Crew]);
      //reestructuro los equipos de la puerta con uno menos.
      setCrewsAtDoor([...crewsAtDoor]);
      // debugger;
    }
  }, !delayManager.stopped  ? checkEnterDelay : 0);

  //intervalo para creación de misiones.
  useInterval(() => {
    if(missionManager.missions_displayed.length < missionManager.MAX_NUMBER_OF_MISSIONS_DISPLAYED){
      missionManager.displayMission();
      totalMissiosnCreated.current++;
    }
  }, delayManager.delays.MISSION_CREATION_DELAY);


  let showInToolTipWithTimer = (value: any) => {
    clearTimeout(timer as number);
    if (value === undefined) {
      timer = setTimeout(() => {
        setToolTipContent(value)
      }, 1500);
    } else {
      setToolTipContent(value)
    }
  }

  return (
    <>
      <StyleContext.Provider value={themeState}>
        <Debugger
          // highlightChairs={() => {
          //   barGrid?.highlight("chair");
          //   // setTriggerRender(!triggerRender);
          //   // setBarGrid(new Grid(barGrid?.hashGrid));
          // }}
          // highlightTables={() => {
          //   barGrid?.highlight("table");
          //   // setTriggerRender(!triggerRender);
          //   // setBarGrid(new Grid(barGrid?.hashGrid));
          // }}
          // stopHighlighting={() => {
          //   barGrid?.stopHighlighting();
          //   // setTriggerRender(!triggerRender);
          //   // setBarGrid(new Grid(barGrid?.hashGrid));
          // }}
          delay={crewCreationDelay}
          enterDelay={checkEnterDelay}
          missionDisplayDelay={delayManager.delays.MISSION_CREATION_DELAY}
          missionsDisplayed={missionManager.missions_displayed.length}
          tables={barGrid.hashGrid && barGrid.getFreeTables()}
          crewsGone={crewsGone.length}
          crewsInside={crewsInside.length}
          crewsInQueue={crewsAtDoor.length}
          crewsAtMission={crewsAtMission.length}
          totalCrewsGone={totalCrewsGone.current}
          totalMissiosnCreated={totalMissiosnCreated.current}
          totalCrewsCreated={totalCrewsCreated.current}
          stopDelays={delayManager.stopDelays}
          startDelays = {delayManager.startDelays}
        />
        <BarEntry crewsAtDoor={crewsAtDoor} />
        <Bar
          showInToolTip={showInToolTipWithTimer}
          missionManager={missionManager}
          barGrid={barGrid as Grid}
        // triggerRender={triggerRender}
        // executeRenderLoop={executeRenderLoop}
        />

        <ToolTipGlobal hidden={toolTipContent === undefined}> {toolTipContent} </ToolTipGlobal>
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



