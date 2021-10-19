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
  },
  {
    name: "crew",
    src: require("../img/common/crew.png").default,
  },
  {
    name: "hero1",
    src: require("../img/common/hero1.png").default,
  },

  {
    name: "hero2",
    src: require("../img/common/hero2.png").default,
  },
  {
    name: "hero3",
    src: require("../img/common/hero3.png").default,
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
  // barTile: {
  //   name: "barTile",
  //   img: imgs.barTile,
  //   xSize: 32,
  //   ySize: 32,
  //   steps: 0,
  //   sheetType: 'vertical',
  // },
  archer: {
    name: "archer",
    animationDir: "rgt",
    img: imgs.hero2,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  ninja: {
    name: "ninja",
    animationDir: "rgt",
    img: imgs.hero2,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  berserker: {
    name: "berserker",
    animationDir: "rgt",
    img: imgs.hero1,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  deffender: {
    name: "deffender",
    animationDir: "rgt",
    img: imgs.hero1,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  fencer: {
    name: "fencer",
    animationDir: "rgt",
    img: imgs.hero3,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  paladin: {
    name: "paladin",
    animationDir: "rgt",
    img: imgs.hero1,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  sniper: {
    name: "sniper",
    animationDir: "rgt",
    img: imgs.hero2,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  soldier: {
    name: "soldier",
    animationDir: "rgt",
    img: imgs.hero3,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  thieve: {
    name: "thieve",
    animationDir: "dwn",
    img: imgs.hero2,
    xSize: 20,
    ySize: 20,
    steps: 4,
    sheetType: 'horizontal',
  },
  // generalCrew: {
  //   name: "crew",
  //   animationDir: "rgt",
  //   img: imgs.thieve,
  //   xSize: 96,
  //   ySize: 96,
  //   steps: 9,
  //   sheetType: 'horizontal',
  // }
  crew: {
    name: "crew",
    animationDir: "rgt",
    img: imgs.crew,
    xSize: 20,
    ySize: 20,
    steps: 4,
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
