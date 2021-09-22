//Barra del bar

import React, { FC, useRef, Dispatch, SetStateAction } from "react";

//Material UI
import { makeStyles, useTheme } from "@material-ui/styles";

import {THEME} from "../constants";
import { ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { useRenderCounter } from "../hooks";

const useStyles = makeStyles((tema: ITheme) => {
  console.log(tema);
  return {
    container: {
      backgroundColor: "burlywood",
    },
    counter: {
      position: "absolute",
    },
  };
});

interface IBarProps {
  setBarCtx: Dispatch<SetStateAction<CanvasRenderingContext2D | undefined>>;
}

const Bar: FC<IBarProps> = (props) => {
  console.log(useTheme());
  const { container, counter } = useStyles();

  const canvasRef = useRef(null);
  const [count] = useRenderCounter();

  return (
    <>
      {/* {console.log(theme)} */}
      <canvas
        id="canvas"
        ref={canvasRef}
        className={container}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      />
      <span className={counter}>{count}</span>
    </>
  );
};

export default Bar;
