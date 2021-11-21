//Entrada del bar

import { FC, useCallback, useContext } from "react";

//Material UI

import { ICrew } from "../interfaces";
import { ImagesContext, loadBoxDimensions, StyleContext } from "../utility";
import { useRenderCounter } from "../hooks";
import { Crew } from "../classes/Crew2";
import { CANVAS_COLS, CANVAS_ROWS } from "../constants/constants";


interface barProps {
  crewsAtDoor: Crew[];
}

const BarEntry: FC<barProps> = ({ crewsAtDoor }) => {
  const { pixelSize, canvasHeight, canvasWidth, height, width } = useContext(StyleContext);

  const barImgs = useContext(ImagesContext);
  const [count] = useRenderCounter();

  let container = {
    height: canvasHeight * pixelSize - height * 3,
    width: width ,
    border: "1px solid black",
    marginTop: height * 3,
  };

  //TODO: deprecated
//   let heroesInQueue = useCallback(() => {
//     let solution: any[] = [];
//     crewsAtDoor.forEach((hero, index) => {
//       let type = hero.className.toLocaleLowerCase() as keyof IImageContext;
//       if (!barImgs[type]) debugger;
//       let { img, steps } = barImgs[type];
//       if (!img) {
//         debugger;
//       }
//       let a = (
//         <div
//           key={index}
//           style={{
//             overflow: "hidden",
//             position: "relative",
//             maxHeight: height,
//             height: "25%",
//           }}
//         >
//           <img
//             alt="e"
//             style={{
//               height: "100%",
//               animation: `iddle 1s steps(${steps}) infinite`,
//               imageRendering: "pixelated",
//             }}
//             src={img.src}
//           />
//         </div>
//       );
//       solution.push(a);
//     });

//     return solution;
//   }, [crewsAtDoor, pixelSize]);

  let crewsInQueue = useCallback((crews: Crew[] ) => {
    let solution: any[] = [];
    crews.forEach((hero, index) => {
      let { img, steps } = barImgs.crew;
      if (!img) {
        debugger;
      }
      let a = (
        <div
          key={index}
          style={{
            overflow: "hidden",
            position: "relative",
            maxHeight: height,
            height: "25%",
          }}
        >
          <img
            alt="e"
            style={{
              height: "100%",
              animation: `iddle 1s steps(${steps}) infinite`,
              imageRendering: "pixelated",
            }}
            src={img.src}
          />
        </div>
      );
      solution.push(a);
    });

    return solution;
  }, [ pixelSize, height]);
  
  return (
    <div style={container}>
      <span style={{ position: "absolute" }}>{count}</span>
      {crewsInQueue(crewsAtDoor)}
    </div>
  );
};

export default BarEntry;
