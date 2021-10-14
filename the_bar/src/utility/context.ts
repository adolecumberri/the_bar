import React from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, THEME } from "../constants/constants";
import { IImageContext, ITheme } from "../interfaces";

const imgBar = new Image();
imgBar.src = require("../sprites/bar_tile2.png").default;

let defaultImageContext = {
  barTile: {
    title: "barTile",
    // img:  (new Image().setAttribute("alt", '../sprites/bar_tile.png') as any as HTMLImageElement),
    // img: (() => (new Image().src = require("../sprites/bar_tile.png")))(),
    img: imgBar,
    xSize: 32,
    ySize: 32,
  }
};

// export const BarContext = React.createContext<CanvasRenderingContext2D | undefined>(undefined);

export const StyleContext = React.createContext<ITheme>(THEME);

export const ImagesContext =
  React.createContext<IImageContext>(defaultImageContext);

export const pixelSize = React.createContext<string>("2px");

//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     }
// ]
