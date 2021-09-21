import React, { FC, useEffect, useState } from "react";

//Material UI
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import {useWindowSize} from '../hooks';
import { theme } from "../theme";
import { ITheme } from "../interfaces";
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

  const windowSizes = useWindowSize();
  const pixelSize = pixelSizeQuery(windowSizes);
  
  return (<>
    {console.log(pixelSize)}
    <ThemeProvider theme={{ ...theme, pixelSize }}>
      <BarContext.Provider value={barCtx}>
        <Bar setBarCtx = {setBarCtx}/>
      </BarContext.Provider>
    </ThemeProvider>
  </>);
};

type IPixelSize = '2px' | '3px' | '4px';
const pixelSizeQuery: (a : number[]) =>  IPixelSize = ( [windowWidth, windowHeight]: number[])=> {
let solution: IPixelSize = '2px';
 if(windowWidth >= 1000){
  solution = '4px';
 }else if(windowWidth >= 700){
  solution = '3px';
 }

 return solution;
}
export default Screen;
