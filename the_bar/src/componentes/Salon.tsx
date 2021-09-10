
//Barra del bar

import React, { FC } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme } from "../interfaces";

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    width: "80%",
    height: "100%",
    backgroundColor: "burlywood"
  },
}));

const Salon: FC = () => {
  const {container } = useStyles();

  return (
   <div className={container} ></div>
  );
};

export default Salon;
