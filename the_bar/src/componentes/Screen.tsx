import React, { FC, useEffect, useState } from "react";

//Material UI
import { makeStyles, ThemeProvider } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";
import { Wall, Board, Salon, Bar, Entrance } from ".";
import { BoardContext, SalonContext } from "../utility";

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

  
  const [boardCtx, setBoardCtx] = useState<CanvasRenderingContext2D>();
  const [salonCtx, setSalonCtx] = useState<CanvasRenderingContext2D>();

  return (
    <ThemeProvider theme={theme}>
      <BoardContext.Provider value={boardCtx}>
  
      <SalonContext.Provider value={salonCtx}>
      <div className={screen}>
        <div className={topRow}>
          <Wall />
          <Board setBoardCtx={setBoardCtx}/>
          <Wall />
        </div>

        <div className={bottomRow}>
          <Entrance />
          <Salon setSalonCtx={setSalonCtx}/>
          <Bar />
        </div>
      </div>
      </SalonContext.Provider>
        </BoardContext.Provider> 
      

      
    
    </ThemeProvider>
  );
};



export default Screen;
