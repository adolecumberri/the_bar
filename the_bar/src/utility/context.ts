import React from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, THEME } from "../constants/constants";
import { IImageContext, ITheme } from "../interfaces";

let urlsToLoad = [
  {
    name: "barTile",
    src: require("../sprites/bar_tile2.png").default,
  },
  {
    name: "archer",
    src: require("../img/common/archer.png").default,
  },
  {
    name: "assasin",
    src: require("../img/common/assasin.png").default,
  },
  {
    name: "berserk",
    src: require("../img/common/berserk.png").default,
  },
  {
    name: "defender",
    src: require("../img/common/defender.png").default,
  },
  {
    name: "fencer",
    src: require("../img/common/fencer.png").default,
  },
  {
    name: "paladin",
    src: require("../img/common/paladin.png").default,
  },
  {
    name: "sniper",
    src: require("../img/common/sniper.png").default,
  },
  {
    name: "soldier",
    src: require("../img/common/soldier.png").default,
  },
  {
    name: "thieve",
    src: require("../img/common/thieve.png").default,
  },
];


let imgs: {
  [x: string]: HTMLImageElement
} = {};

urlsToLoad.forEach(({ name, src }) => {
  let newImg = new Image();
  newImg.src = src
  imgs[name] = newImg;
})
// const imgBar = new Image();
// imgBar.src = require("../sprites/bar_tile2.png").default;

let defaultImageContext = {
  barTile: {
    title: "barTile",
    img: imgs.barTile,
    xSize: 32,
    ySize: 32,
  },
  archer: {
    name: "archer",
    animationDir: "rgt",
    img: imgs.archer,
    xSize: 186,
    ySize: 80,
  },
  assasin: {
    name: "assasin",
    animationDir: "dwn",
    img: imgs.assasin,
    xSize: 126,
    ySize: 27,
  },
  berserk: {
    name: "berserk",
    animationDir: "dwn",
    img: imgs.berserk,
    xSize: 126,
    ySize: 29,
  },
  defender: {
    name: "defender",
    animationDir: "dwn",
    img: imgs.assasin,
    xSize: 137,
    ySize: 44,
  },
  fencer: {
    name: "fencer",
    animationDir: "dwn",
    img: imgs.assasin,
    xSize: 82,
    ySize: 23,
  },
  paladin: {
    name: "paladin",
    animationDir: "dwn",
    img: imgs.assasin,
    xSize: 119,
    ySize: 124,
  },
  sniper: {
    name: "sniper",
    animationDir: "dwn",
    img: imgs.assasin,
    xSize: 117,
    ySize: 26,
  },
  soldier: {
    name: "soldier",
    animationDir: "rgt",
    img: imgs.assasin,
    xSize: 156,
    ySize: 64,
  },
  thieve: {
    name: "thieve",
    animationDir: "dwn",
    img: imgs.assasin,
    xSize: 64,
    ySize: 64,
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
