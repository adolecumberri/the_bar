import React, { FC } from "react";

//Material UI
import { makeStyles, ThemeProvider } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";
import { Wall, Board, Salon, Bar } from ".";

const useStyles = makeStyles((theme: ITheme) => ({
  screen: {
    width: "1536px",
    height: "864px",
    border: "1px solid black",
  },
  topRow: {
    display: "flex",
    height: '25%'
  },
  bottomRow: {
    display: "flex",
    height: '75%'
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
          <Salon />
          <Bar />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Screen;
