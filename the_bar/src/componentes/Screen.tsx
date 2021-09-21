import React, { FC, useEffect, useState } from "react";

//Material UI
import { makeStyles, ThemeProvider } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";
import { Wall, Board, Salon, Bar, Entrance } from ".";

const useStyles = makeStyles((theme: ITheme) => ({
  screen: {
    width: "80%",
    height: "80%",
    border: "1px solid black",
  },
  topRow: {
    display: "flex",
    height: '20%'
  },
  bottomRow: {
    display: "flex",
    height: '80%'
  }


}));

const Screen: FC = () => {
  const { screen, topRow, bottomRow } = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={screen}>
        <div className={topRow}>
          <Wall />
          <Board />
          <Wall />
        </div>

        <div className={bottomRow}>
          <Entrance />
          <Salon />
          <Bar />
        </div>
      </div>
    </ThemeProvider>
  );
};



export default Screen;
