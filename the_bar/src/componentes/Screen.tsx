import { FC, useEffect, useState, useContext } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { useWindowSize } from "../hooks";

import { IGridHash, IPixelSize, ITheme } from "../interfaces";
import { Bar } from ".";
import { StyleContext } from "../utility";
import { THEME } from "../constants/constants";
import BarEntry from "./BarEntry";
import { Grid } from "../classes/Grid";
import Debugger from "./Debugger";
import { createHero } from "../utility/Utility";

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

  const { canvasHeight, canvasWidth } = useContext(StyleContext);

  const [windowWidth, windowHeight] = useWindowSize();

  const [pixelSize, setPixelSize] = useState(pixelSizeQuery(windowWidth));
  const [themeState, setThemeState] = useState(THEME);

  const [triggerRender, setTriggerRender] = useState(false); //Trigger a canvas render

  const [barGrid, setBarGrid] = useState<Grid>(new Grid());

//------CREWS.----------
//TODO: metería esto en un hook personalizado, que creo que puede ser 
// una clase ES6 pero mucho mas flexible en el paradigma de react. 
const [allCrews, setAllCrews] = useState<any>();
const [crewsAtDoor, setCrewsAtDoor] = useState<any>();


const [randomGuy, setRandomGuy] = useState<any>(createHero());

  useEffect(() => {
    // debugger;
    //hay un bug, que windowWidth se lee como 0
    let newPixelSize = pixelSizeQuery(!!windowWidth ? windowWidth : window.innerWidth);
    if (newPixelSize !== pixelSize) {
      setPixelSize(newPixelSize);
    }
  }, [windowWidth]);

  useEffect(() => {
    setThemeState({ ...THEME, pixelSize });
  }, [pixelSize]);

  useEffect(() => {
    let rows = 6,
      cols = 16,
      t_width = canvasWidth * pixelSize,
      t_height = canvasHeight * pixelSize;

    let grid = new Grid();
    grid._initNewGridWithTables({ rows, cols, t_width, t_height });

    setBarGrid(grid);
  }, [pixelSize]);


  // const executeRenderLoop: (callBack: any) => void = (callBack) => {
  //   callBack();
  // }


  return (
    <>
      <StyleContext.Provider value={themeState}>
        <Debugger
          highlightChairs={() => {
            barGrid?.highlight("chair");
            setTriggerRender(!triggerRender);
            // setBarGrid(new Grid(barGrid?.hashGrid));
          }}
          highlightTables={() => {
            barGrid?.highlight("table");
            setTriggerRender(!triggerRender);
            // setBarGrid(new Grid(barGrid?.hashGrid));
          }}
          stopHighlighting={() => {
            barGrid?.stopHighlighting();
            setTriggerRender(!triggerRender);
            // setBarGrid(new Grid(barGrid?.hashGrid));
          }}
        />
        <BarEntry />
        <Bar 
          barGrid={barGrid as Grid} 
          triggerRender={triggerRender} 
          // executeRenderLoop={executeRenderLoop}
        />
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
