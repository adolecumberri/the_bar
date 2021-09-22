//Entrada del bar

import React, { FC } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import {THEME} from '../constants';
import { ITheme } from "../interfaces";

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    width: "5%",
    height: "100%",
    backgroundColor: "wheat"
  },
}));

const Entrance: FC = () => {
  const { container } = useStyles();

  return <div className={container}></div>;
};

export default Entrance;
