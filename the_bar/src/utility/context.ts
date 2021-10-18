import React from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, THEME } from "../constants/constants";
import { IImageContext, IImgAnimation, ITheme } from "../interfaces";

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
    name: "ninja",
    src: require("../img/common/ninja.png").default,
  },
  {
    name: "berserker",
    src: require("../img/common/berserker.png").default,
  },
  {
    name: "deffender",
    src: require("../img/common/deffender.png").default,
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
  {
    name: "generalCrew",
    src: require("../img/common/goup_sprite.png").default,
  }
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

let defaultImageContext: IImageContext = {
  barTile: {
    name: "barTile",
    img: imgs.barTile,
    xSize: 32,
    ySize: 32,
    steps: 0,
    sheetType: 'vertical',
  },
  archer: {
    name: "archer",
    animationDir: "rgt",
    img: imgs.archer,
    xSize: 186,
    ySize: 80,
    steps: 6,
    sheetType: 'horizontal',
  },
  ninja: {
    name: "ninja",
    animationDir: "dwn",
    img: imgs.ninja,
    xSize: 126,
    ySize: 27,
    steps: 4,
    sheetType: 'vertical',
  },
  berserker: {
    name: "berserker",
    animationDir: "dwn",
    img: imgs.berserker,
    xSize: 126,
    ySize: 39,
    steps: 5,
    sheetType: 'vertical',
  },
  deffender: {
    name: "deffender",
    animationDir: "dwn",
    img: imgs.deffender,
    // xSize: 137,
    xSize: '100%',
    ySize: 44,
    steps: 4,
    sheetType: 'vertical',
  },
  fencer: {
    name: "fencer",
    animationDir: "dwn",
    img: imgs.fencer,
    xSize: 82,
    ySize: 23,
    steps: 5,
    sheetType: 'vertical',
  },
  paladin: {
    name: "paladin",
    animationDir: "dwn",
    img: imgs.paladin,
    xSize: 119,
    ySize: 124,
    steps: 9,
    sheetType: 'vertical',
  },
  sniper: {
    name: "sniper",
    animationDir: "dwn",
    img: imgs.sniper,
    xSize: 117,
    ySize: 26,
    steps: 4,
    
    sheetType: 'vertical',
  },
  soldier: {
    name: "soldier",
    animationDir: "rgt",
    img: imgs.soldier,
    xSize: 156,
    ySize: 64,
    steps: 7,
    sheetType: 'horizontal',
  },
  thieve: {
    name: "thieve",
    animationDir: "dwn",
    img: imgs.thieve,
    xSize: 64,
    ySize: 64,
    steps: 4,
    sheetType: 'horizontal',
  },
  generalCrew: {
    name: "crew",
    animationDir: "rgt",
    img: imgs.thieve,
    xSize: 96,
    ySize: 96,
    steps: 9,
    sheetType: 'horizontal',
  }
};

// export const BarContext = React.createContext<CanvasRenderingContext2D | undefined>(undefined);

export const StyleContext = React.createContext<ITheme>(THEME);

export const ImagesContext =
  React.createContext(defaultImageContext);

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
