/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, useContext, useCallback, useReducer, ReactNode, Reducer, useRef } from "react";

//Material UI

import { useWindowSize } from "../hooks";

import { IMission, IPixelSize } from "../interfaces";
import { Bar2, ToolTipGlobal } from ".";
import { StyleContext } from "../utility";
import { THEME, CANVAS_COLS, CANVAS_ROWS } from "../constants/constants";
import BarEntry from "./BarEntry";
import { Grid } from "../classes/Grid";
import Debugger from "./Debugger";
import { rand, uniqueID } from "../utility/Utility";
import useInterval from "../hooks/useInterval";
import { Crew } from "../classes/Crew2";
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

  const [areDelaisStopped, setAreDelaisStopped] = useState(false);
  const getDelaisAreStopped = () => {
    return areDelaisStopped;
  }


  const [delayManager] = useState(new DelayManager(
    [
      getDelaisAreStopped,
      setAreDelaisStopped
    ]
  ));

  //DELAYS
  // const [crewCreationDelay, setCrewCreationDelay] = useState(delayManager.delays.MIN_CREW_CREATION_DELAY);
  // const [checkEnterDelay, setCheckEnterDelay] = useState(delayManager.delays.ENTER_DELAY);

  const totalCrewsCreated = useRef(0);
  const totalMissiosnCreated = useRef(0);
  const totalCrewsGone = useRef(0);

  //omito el setter. no re reestructura el mision manager.
  const [missionManager] = useState(new MissionManager(delayManager));

  const [toolTipContent, setToolTipContent] = useState(undefined)

  // const [intervalFlag, setIntervalFlag] = useState<boolean | null>(true); //TODO: unused


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

  //when crewsAtDoor changes, re-starts delay used in the interval of creation.
  //when crewsAtDoor chages, re-start or stops delay used to check if a crew enters.
  useEffect(() => {
    console.log("entro");
    console.log(crewsAtDoor.length);
    console.log(barGrid.getFreeTables().length);
    console.log(!areDelaisStopped);
    if (crewsAtDoor.length < 5 && barGrid.getFreeTables().length > 0 && !areDelaisStopped) {
      // menos de 5 equipos en puerta Y mesas libres? activo el timer para crear grupos.
      delayManager.startDelay("CREW_CREATION_DELAY"); 
    }else {
      delayManager.stopDelay("CREW_CREATION_DELAY");
    }

  
    if (crewsAtDoor.length === 0) {
        //no hay crews en la puerta? apago el timer para entrar. sino ro reinicio.
      delayManager.stopDelay("ENTER_DELAY");
    } else {   
      delayManager.startDelay("ENTER_DELAY");
    }

    //si entro aqui y el checkEnterDelay esta apagado, lo reinicio.
    if (!delayManager.delays.ENTER_DELAY) delayManager.startDelay("ENTER_DELAY");

  }, [crewsAtDoor.length, barGrid.getFreeTables().length, areDelaisStopped, !!delayManager.delays.CREW_CREATION_DELAY]);

//   //Mission controller.
//   useEffect(() => {
//     if (missionManager.missions_displayed.length >= 7) {
//       missionManager.stopMissionCreationDelay();
//     } else {
//       if (delayManager.delays.MISSION_CREATION_DELAY === 0 && !areDelaisStopped) {
//         missionManager.restartMissionCreationDelay();
//       }
//     }

//   }, [missionManager.missions_displayed.length, areDelaisStopped])

//   //triggers render.
//   useEffect(() => {
//     console.log("triggers render. IsStopped: " + areDelaisStopped);
//   }, [areDelaisStopped]);


// const crewsAtMissionHandler = (crew: Crew) => {
//   // Añado la crew a la lista de crews en missiones.
//   setCrewsAtMission([...crewsAtMission, crew]);
//   // Filtro la crew de las que estan dentro.
//   debugger;
//   let crewsFiltered =  [...crewsInside.filter(
//     c => {
      
//       return c.id !== crew.id
//     }
//   )];
//   debugger;
//   setCrewsInside(
//     crewsFiltered
//   );
// }

//   //funcion para Crew, que manda al equipo a la mission.
//   const sendCrewOnAMission = (crew: Crew) => {
// //llamo a una funcion que se recompone.
// // si llamo a esta funcion, se llama a una instanci de la misma con valores obsoletos de los hooks.
// //No Funciona.
//     crewsAtMissionHandler(crew);
  
//   };
//   // , [crewsAtMission.length, crewsInside.length]);

//   const liberateTableFromCrew = useCallback((tableId: number) => {
//     barGrid.liberateTableFromCrew(tableId);
//     crewsAtMissions()
//   }, [barGrid.getFreeTables().length, crewsInside.length]);

//   //funcion pasada al equipo, para asignarles una mision desde el mission Manager
//   const assignMission = useCallback(() => {
//     //doy una mision
//     let missionSelected = missionManager.getMissionDisplayed();
//     return missionSelected;
//   }, [missionManager.missions_displayed.length, crewsInside.length]);


  //intervalo para añadir equipos a la puerta
  useInterval(() => {
    console.log("interval", barGrid.getFreeTables().length, crewsAtDoor.length === 5);
    if (barGrid.getFreeTables().length === 0 || crewsAtDoor.length === 5) {
      //No hay mesass? paro la llegada a la puerta
      //TODO: no lanza trigger render. así que si no cambia un estado, realmente no se ve que se para
      delayManager.stopDelay("CREW_CREATION_DELAY");

    } else if (crewsAtDoor.length < 5) {

      totalCrewsCreated.current++;
      //creo Crew
      let id = uniqueID();
      let newCrew = new Crew({ heroNum: rand(4, 2), id, delayManager });
      setCrewsAtDoor([...crewsAtDoor, newCrew ]);
      
      //delay random desde el minimo hasta el máximo tiempo de creación
      delayManager.startDelay("CREW_CREATION_DELAY");

    }
  },
    // !delayManager.stopped ? crewCreationDelay : 0
    delayManager.delays.CREW_CREATION_DELAY
  );

  //intervalo para entrar en el bar
  useInterval(() => {
    if (crewsAtDoor.length === 0) {
      delayManager.stopDelay("ENTER_DELAY");
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
      //TODO: esta funcion va controlada por un componente
      // crewToEnter.asignTableByTableId(freeTables[0].tableId); //no meto la id, meto coordenadas
      crewToEnter.asignTableCoordinates(freeTables[0]);
      //asigno mesa en equipo
      freeTables[0].occupyTable(crewToEnter);
      //Saco el equipo que entra de los grupos en la puerta.
      const crewEntering = crewsAtDoor.shift();
      //añado el equipo a los equipos de dentro.
      setCrewsInside([...crewsInside, crewEntering as Crew]);
      //reestructuro los equipos de la puerta con uno menos.
      setCrewsAtDoor([...crewsAtDoor]);
    }
  }, delayManager.delays.ENTER_DELAY);

//   //intervalo para creación de misiones.
//   useInterval(() => {
//     if (missionManager.missions_displayed.length < missionManager.MAX_NUMBER_OF_MISSIONS_DISPLAYED) {
//       missionManager.displayMission();
//       totalMissiosnCreated.current++;
//     }
//   }, delayManager.delays.MISSION_CREATION_DELAY);

//carga el tooltip tras un delay.
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
          delay={delayManager.delays.CREW_CREATION_DELAY}
          enterDelay={delayManager.delays.ENTER_DELAY}
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
          startDelays={delayManager.startDelays}
          areDelaisStopped={areDelaisStopped}
        />
        <BarEntry crewsAtDoor={crewsAtDoor} />
        <Bar2
          showInToolTip={showInToolTipWithTimer}
          // missionManager={missionManager}
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



