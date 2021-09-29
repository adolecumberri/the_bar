import React, { FC, useEffect, useState } from "react";

//Material UI
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { createTheme } from '@material-ui/core/styles';

import { useWindowSize } from "../hooks";

import { IPixelSize, ITheme } from "../interfaces";
import { Bar } from ".";
import { BarContext, StyleContext } from "../utility";
import { pixelSize } from "../utility/context";
import { THEME } from "../constants";

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

  const [barCtx, setBarCtx] = useState<CanvasRenderingContext2D>();
  const [windowWidth, windowHeight] = useWindowSize();
  // const pixelSize = pixelSizeQuery(windowSizes);

  const [pixelSize, setPixelSize] = useState(pixelSizeQuery(windowWidth));
  const [themeState, setThemeState] = useState(THEME);

  useEffect(() => {
    let newPixelSize = pixelSizeQuery(windowWidth);
    if(newPixelSize !== pixelSize){
      setPixelSize(newPixelSize);
    }
  }, [windowWidth]);

  useEffect(() => {
    setThemeState( {...THEME, pixelSize} );
  }, [pixelSize]);

  return (
    <>
      <StyleContext.Provider value={themeState}>
        <BarContext.Provider value={barCtx}>
          <Bar setBarCtx={setBarCtx} />
        </BarContext.Provider>
      </StyleContext.Provider>
    </>
  );
};

const pixelSizeQuery: (a : number) =>  IPixelSize = ( windowWidth: number)=> {
let solution: IPixelSize = 1;
 if(windowWidth >= 1920){
  solution = 2.5;
 }else if(windowWidth >= 1280){
  solution = 2;
 } else if( windowWidth >= 980){
    solution = 1.5;
 } else if( windowWidth <= 650){
   solution = 0.75;
 }

 return solution;
}
export default Screen;
