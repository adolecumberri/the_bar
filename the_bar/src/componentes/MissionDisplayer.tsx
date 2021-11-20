//tablón de anuncios.

//Barra del bar

import React, { FC, useContext } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";
import { ITheme } from "../interfaces";
import { Table } from "../classes/GridBoxesTypes";
import { CANVAS_COLS, CANVAS_ROWS } from "../constants/constants";
import { ImagesContext, loadBoxDimensions, StyleContext } from "../utility";

const useStyles = makeStyles((Theme: ITheme) => ({
  
}));

interface IMissionDisplayer {
  
}

const MissionDisplayer: FC<IMissionDisplayer> = ({
 
}) => {
    //
  const {  } = useStyles();
  const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);
  const barImgs = useContext(ImagesContext);

  //cell height and width height
  const { height, width } = loadBoxDimensions({
    rows: CANVAS_ROWS,
    cols: CANVAS_COLS,
    t_width: canvasWidth * pixelSize,
    t_height: canvasHeight * pixelSize,
    topMargin: 2,
  });

  let container = {
    height: canvasHeight * pixelSize , //- height * 3
    width: width * 2,
    border: "1px solid black",
    // marginTop: height ,
    marginLeft: width,
  };



  return (
    <div style={container}>
    
    </div>
  );
};

export default MissionDisplayer;

