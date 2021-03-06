//tablón de anuncios.

//Barra del bar

import React, { FC } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";
import { ITheme } from "../interfaces";
import { Table } from "../classes/GridBoxesTypes";

const useStyles = makeStyles((Theme: ITheme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    minWidth: "200px",
    maxWidth: "200px",
    minHeight: "400px",
    border: "1px solid #4d4d4d",
    margin: "16px 0px 0px 16px"
  },
  tablesContainer: { display: "flex", flexWrap: "wrap" },
  tableInfo: {
    border: "1px solid #e1e1e1",
    color: "#ffffff",
    backgroundColor: "#5b1f1f",
    margin: "4px",
    padding: "4px"
  }
}));

interface IDebugger {
  // highlightTables?: () => void,
  // highlightChairs?: () => void,
  // stopHighlighting?: () => void,
  delay: number,
  enterDelay: number,
  missionDisplayDelay: number,
  missionsDisplayed: number,
  tables: Table[],
  crewsInside: number,
  crewsGone: number,
  crewsInQueue: number,
  crewsAtMission: number,
  totalCrewsGone: number,
  totalMissiosnCreated: number,
  totalCrewsCreated: number,
  // controlGlobalDelays: any,
  // intervalsAllowed: boolean,
  stopDelays: () => void,
  startDelays: () => void,
  areDelaisStopped: boolean,
}

const Debugger: FC<IDebugger> = ({
  // highlightChairs,
  // highlightTables,
  // stopHighlighting,
  delay,
  enterDelay,
  missionDisplayDelay,
  tables,
  crewsInside,
  crewsInQueue,
  crewsGone,
  missionsDisplayed,
  totalCrewsGone,
  totalMissiosnCreated,
  totalCrewsCreated,
  crewsAtMission,
  stopDelays,
  startDelays,
  areDelaisStopped
}) => {
  const { container, tableInfo, tablesContainer } = useStyles();

  return (
    <div className={container}>
      {/* {highlightChairs && (<>
        <label> chairs: <input type="button" name="debbug"
          onClick={(e) => {
            highlightChairs && highlightChairs();
          }}
        ></input></label><br />
      </>)}
      {highlightTables && (<>
        <label> tables: <input type="button" name="debbug"
          onClick={(e) => {
            highlightTables && highlightTables();
          }}
        ></input></label><br />
      </>)}
      {(highlightTables || highlightChairs) && (<>
        <label> none: <input type="button" defaultChecked name="debbug"
          onClick={(e) => {
            stopHighlighting && stopHighlighting();
          }}
        ></input></label><br />
      </>)} */}
      entry creation delay: {delay} <br />
      enter delay: {enterDelay} <br />
      misº. creation delay: {missionDisplayDelay} < br />
      {tables && tables.length && <>
        free tables: <br />
        <div className={tablesContainer}>
          {tables.map(
            ({ tableId, chairs }, index) =>
              <div
                key={`tableInfo-${index}`}
                className={tableInfo}
              >
                id:{tableId} - sillas:{chairs.length}
              </div>
          )}
        </div>
      </>}

      crewsInside: {crewsInside} <br />
      crewsAtDoor: {crewsInQueue} <br />
      crewsGone: {crewsGone} <br />
      crewsAtMission: {crewsAtMission} <br />
      missionsDisplayed: {missionsDisplayed} <br />

      totalCrewsGone: {totalCrewsGone}<br />
      totalMissiosnCreated: {totalMissiosnCreated}<br />
      totalCrewsCreated: {totalCrewsCreated}<br />
      <label>
        <input
          type="radio"
          name="startStop"
          onChange={(e) => stopDelays()}
          checked ={areDelaisStopped}
        />
        Stop
      </label>
      <label>
        <input
          type="radio"
          name="startStop"
          onChange={(e) => startDelays()}
          checked={!areDelaisStopped}
        />
        Start
      </label>
    </div>
  );
};

export default Debugger;
