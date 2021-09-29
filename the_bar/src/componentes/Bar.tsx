//Barra del bar

import React, { FC, useRef, Dispatch, SetStateAction, useEffect, useContext} from "react";

//Material UI
import { makeStyles, useTheme } from "@material-ui/styles";

import {THEME} from "../constants";
import { ITheme } from "../interfaces";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { useRenderCounter } from "../hooks";
import { StyleContext } from "../utility";

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
  const { setBarCtx } = props;
  const { container, counter } = useStyles();
  const { pixelSize } = useContext(StyleContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [count] = useRenderCounter();

  useEffect( () => {
    setBarCtx(canvasRef.current?.getContext('2d') as CanvasRenderingContext2D )
  })



  return (
    <>
      {/* {console.log(theme)} */}
      <canvas
        id="canvas"
        ref={canvasRef}
        className={container}
        width={CANVAS_WIDTH * pixelSize}
        height={CANVAS_HEIGHT * pixelSize}
      />
      <span className={counter}>{count}</span>
    </>
  );
};

export default Bar;


