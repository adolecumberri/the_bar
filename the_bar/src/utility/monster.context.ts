import React from "react";
import { IImageContext } from "../interfaces";

let urlsToLoad = [
  {
    name: "52",
    src: require("../monsters/img/52.png").default,
  },
  {
    name: "53",
    src: require("../monsters/img/53.png").default,
  },
  {
    name: "59",
    src: require("../monsters/img/59.png").default,
  },
  
];


let imgs: {
  [x: string]: HTMLImageElement
} = {};

urlsToLoad.forEach(({ name, src }) => {
  let newImg = new Image();
  newImg.src = src
  imgs[name] = newImg;
});

export let defaultMonsterContext: IImageContext = {
  52: {
    name: "birdo",
    animationDir: "right",
    img: imgs[52],
    xSize: 98,
    ySize: 98,
    steps: 1,
    sheetType: 'horizontal',
    visualTransform: 'scale(1.8) translate(0px, -13px)',
  },
  53: {
    name: "birdo+",
    animationDir: "right",
    img: imgs[53],
    xSize: 98,
    ySize: 98,
    steps: 1,
    sheetType: 'horizontal',
  },
  59: {
    name: "dimitri",
    animationDir: "right",
    img: imgs[59],
    xSize: 98,
    ySize: 98,
    steps: 1,
    sheetType: 'horizontal',
  }
};


export const MonsterContext = React.createContext(defaultMonsterContext);

