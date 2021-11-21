import React from "react";
import { IImageContext } from "../interfaces";

let urlsToLoad = [
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


  export let defaultHeroContext: IImageContext = {
    archer: {
      name: "archer",
      animationDir: "right",
      img: imgs.hero2,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    ninja: {
      name: "ninja",
      animationDir: "right",
      img: imgs.hero2,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    berserker: {
      name: "berserker",
      animationDir: "right",
      img: imgs.hero1,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    deffender: {
      name: "deffender",
      animationDir: "right",
      img: imgs.hero1,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    fencer: {
      name: "fencer",
      animationDir: "right",
      img: imgs.hero3,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    paladin: {
      name: "paladin",
      animationDir: "right",
      img: imgs.hero1,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    sniper: {
      name: "sniper",
      animationDir: "right",
      img: imgs.hero2,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
    soldier: {
      name: "soldier",
      animationDir: "right",
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
  };
  
  console.log(defaultHeroContext);

  export const HeroContext = React.createContext(defaultHeroContext);