//tablón de anuncios.

//Barra del bar

import React, { FC, useCallback, useContext } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";
import { ITheme } from "../interfaces";
import { Table } from "../classes/GridBoxesTypes";
import { CANVAS_COLS, CANVAS_ROWS } from "../constants/constants";
import { CrewContext, loadBoxDimensions, StyleContext } from "../utility";
import { Crew } from "../classes/Crew2";
import { Monster } from "../classes/Monster";

const useStyles = makeStyles((Theme: ITheme) => ({

}));

interface IMissionDisplayer {
  crewsAtMission: Crew[],
}

const MissionDisplayer: FC<IMissionDisplayer> = ({
  crewsAtMission = [],

}) => {
  //
  const { } = useStyles();
  const { pixelSize, canvasHeight, canvasWidth, height, width } = useContext(StyleContext);
  const barImgs = useContext(CrewContext);
  let { img, steps, xSize } = barImgs.crew;

  let container = {
    height: canvasHeight * pixelSize, //- height * 3
    width: width * 5,
    border: "1px solid black",
    // marginTop: height ,
    marginLeft: width,
    overflowX: "hidden",
  };

  let loadMissionDiv = useCallback(({ id, mission }: Crew) => {

    let div: JSX.Element = (
      <div
        key={`mission-${id}`}
        className=""
        style={
          {
            width: "100%",
            height: height,
            boxSizing: "border-box",
            borderBottom: "1px solid black",
            backgroundColor: "beige",
            display: "flex",
          }
        }
      >
        <div style={{
          maxWidth: xSize * pixelSize - 1,
          overflow: "hidden",
          height: "100%",
        }}>
          <img
            alt="e"
            style={{

              height: "100%",
              animation: `iddle 1s steps(${steps}) infinite`,
              imageRendering: "pixelated",
            }}
            src={img.src}
          />
        </div>
        <span></span>
        {(mission?.fights[0].monsters as Monster[]).map(({ img: {visualTransform, img}, id, name }) =>
          <div style={{
            maxWidth: xSize * pixelSize - 1,
            overflow: "hidden",
            height: "100%",
          }}>
            <img
              key={`img-${id}`}
              alt={`${name}`}
              src={(img as HTMLImageElement).src}
              style={{
                height: "100%",
                transform: visualTransform ? visualTransform : "none"
              }}
            />
          </div>
        )
        }



      </div>
    );

    return div;
  }, [height, width]);


  let _loadCrewsAtMission = () => {
    let solution: JSX.Element[] = [];


    crewsAtMission.forEach((crew, i) => {
      solution.push(loadMissionDiv(crew));
    });

    return solution;
    ;
  }

  return (
    <div style={container as any}>
      {_loadCrewsAtMission()}
    </div>
  );
};

export default MissionDisplayer;

