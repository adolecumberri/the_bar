import React from "react";
import { IImageContext } from "../interfaces";

//escribo la url. (no puede hacerse dinamicamente)
let urlsToLoad = [
    {
      name: "crew",
      src: require("../img/common/crew.png").default,
    },  
  ];
  

  let imgs: {
    [x: string]: HTMLImageElement
  } = {};
  
  //crew el img element correspondiente.
  urlsToLoad.forEach(({ name, src }) => {
    let newImg = new Image();
    newImg.src = src
    imgs[name] = newImg;
  });


  export let defaultImageContext: IImageContext = {
    crew: {
      name: "crew",
      animationDir: "right",
      img: imgs.crew,
      xSize: 20,
      ySize: 20,
      steps: 4,
      sheetType: 'horizontal',
    },
  };
  

  export const CrewContext = React.createContext(defaultImageContext);