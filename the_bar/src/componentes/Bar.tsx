//Barra del bar

import React, { FC, useRef, Dispatch, SetStateAction } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import theme from "../theme";
import { ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { useRenderCounter } from "../hooks";

const useStyles = makeStyles((theme: ITheme) => {
  console.log(theme);
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

const Bar: FC<IBarProps> = () => {
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
