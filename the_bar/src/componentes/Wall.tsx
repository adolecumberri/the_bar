//muros izq y derecha del tablon de anuncio
import React, { FC } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { ITheme } from "../interfaces";

const useStyles = makeStyles((Theme: ITheme) => ({
  container: {
    width: "30%",
    height: "100%",
    backgroundColor: "sienna",
  },
}));

const Wall: FC = () => {
  const { container } = useStyles();

  return <div className={container}></div>;
};

export default Wall;
