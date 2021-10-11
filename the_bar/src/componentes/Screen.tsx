import React, { FC, useEffect, useState } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { useWindowSize } from "../hooks";

import { IPixelSize, ITheme } from "../interfaces";
import { Bar } from ".";
import { StyleContext, ImagesContext } from "../utility";
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

  // const [barCtx, setBarCtx] = useState<any>();
  const [windowWidth, windowHeight] = useWindowSize();
  // const pixelSize = pixelSizeQuery(windowSizes);

  const [pixelSize, setPixelSize] = useState(pixelSizeQuery(windowWidth));
  const [themeState, setThemeState] = useState(THEME);

  useEffect(() => {
    debugger;
    //hay un bug, que windowWidth se lee como 0
    let newPixelSize = pixelSizeQuery(!!windowWidth ? windowWidth : window.innerWidth );
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
        {/* <BarContext.Provider value={barCtx}> */}
        {/* <ImagesContext.Provider> */}
          <Bar/>
        {/* </ImagesContext.Provider> */}
        {/* </BarContext.Provider> */}
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
