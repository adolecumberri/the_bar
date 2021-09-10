//tablón de anuncios.

//Barra del bar

import React, { FC } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";

const useStyles = makeStyles((theme: ITheme) => ({
    container: {
        width: "60%",
        height: "100%",
        backgroundColor: "goldenrod"
      },
}));

const Board: FC = () => {
  const { container } = useStyles();

  return (
   <div className={container}></div>
  );
};

export default Board;
