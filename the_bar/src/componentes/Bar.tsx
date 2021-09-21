//Barra del bar

import React, { FC, useRef, Dispatch, SetStateAction } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    width: "20%",
    height: "100%",
    backgroundColor: "wheat",
    
  },
}));

interface IBarProps {
  setBarCtx: Dispatch<SetStateAction<CanvasRenderingContext2D | undefined>>
}

const Bar: FC<IBarProps> = () => {
  const { container } = useStyles();

  const canvasRef = useRef(null);

  return  <>
  <canvas
    id="canvas"
    ref={canvasRef}
    className={container}
    width={canvasWidth}
    height={canvasHeight}
  />
  <span className={counter}>{count}</span>
</>;
};

export default Bar;
