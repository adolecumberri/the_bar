//tablón de anuncios.

//Barra del bar

import React, { FC } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { THEME } from '../constants/constants';
import { ITheme } from "../interfaces";

const useStyles = makeStyles((Theme: ITheme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    minWidth: "200px",
    minHeight: "400px",
    border: "1px solid #4d4d4d",
    margin: "16px 0px 0px 16px"

  },
}));

interface IDebugger {
  highlightTables?: () => void,
  highlightChairs?: () => void,
  stopHighlighting?: () => void,
}

const Debugger: FC<IDebugger> = ({ highlightChairs, highlightTables, stopHighlighting }) => {
  const { container } = useStyles();

  return (
    <div className={container}>
      {highlightChairs && (<>
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
        ></input></label>
      </>)}
    </div>
  );
};

export default Debugger;
