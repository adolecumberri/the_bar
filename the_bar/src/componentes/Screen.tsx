import React, { FC, useEffect, useState } from "react";

//Material UI
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { createTheme } from '@material-ui/core/styles';

import { useWindowSize } from "../hooks";

import { ITheme } from "../interfaces";
import theme from "../theme";
import { Wall, Board, Salon, Bar, Entrance } from ".";
import { BarContext } from "../utility";
import { pixelSize } from "../utility/context";

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
  const [themeState, setThemeState] = useState(createTheme(theme));
  
  useEffect(() => {
    console.log("1º useEffect");
    let newPixelSize = pixelSizeQuery(windowWidth);
    if(newPixelSize !== pixelSize){
      setPixelSize(newPixelSize);
    }
  }, [windowWidth]);

  useEffect(() => {
    createTheme({...theme, pixelSize} as any);
  }, [pixelSize]);

  return (
    <>
      {console.log(pixelSize)}
      {/* <ThemeProvider theme={{ ...theme, pixelSize }}> */}
      <BarContext.Provider value={barCtx}>
        <Bar setBarCtx={setBarCtx} />
      </BarContext.Provider>
      {/* </ThemeProvider> */}
    </>
  );
};

type IPixelSize = '1px' | '2px' | '3px';
const pixelSizeQuery: (a : number) =>  IPixelSize = ( windowWidth: number)=> {
let solution: IPixelSize = '1px';
 if(windowWidth >= 1920){
  solution = '3px';
 }else if(windowWidth >= 1280){
  solution = '2px';
 }

 return solution;
}
export default Screen;
