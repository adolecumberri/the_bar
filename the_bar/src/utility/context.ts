import React from "react";
import { THEME } from "../constants/constants";
import { IImageContext, ITheme } from "../interfaces";

export const StyleContext = React.createContext<ITheme>(THEME);


export const pixelSize = React.createContext<string>("2px");
