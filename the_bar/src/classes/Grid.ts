import { GRID_CONFIG } from "../constants";
import { IGridConstructor } from "../interfaces";
import { GridBoxesTypes } from "./GridBoxesTypes";

export const Grid = () => {
  class Grid {
    _initNewGrid = ({ rows, cols, t_width, t_height }: IGridConstructor) => {
      if (t_width % cols || t_height % rows)
        throw new Error(
          "Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!"
        );

      let width = t_width / cols;
      let height = t_height / rows;
      let gridHash = {};

      for (let Y = 0; Y <= rows - 1; Y++) {
        for (let X = 0; X <= cols - 1; X++) {
          //variables.
          let key = `${X}-${Y}`;
          let gX = X;
          let gY = Y;
          let x = X * width;
          let y = Y * height;
          let gridTypeConfig = GRID_CONFIG.void;

         //  let gridBox = new GridBoxesTypes.GridBox({
         //    key,
         //    gX,
         //    gY,
         //    x,
         //    y,
         //    width,
         //    height,
         //    ...gridTypeConfig,
         //  });

         //  console.log(gridBox);
          //  if (!game.heroPosition && (utils._randInt(1, 20) > 15) && gridBox.type === 'walkable') game.heroPosition = gridBox;

          //  gridHash[key] = gridBox;
        }
      }
      console.log({ gridHash });
      return gridHash;
    };

    //Sin Tocar.
    //  _resetGrid = () => {
    //     let nextSrc, nextDest;
    //     console.log('resetting')

    //     for (let coords in game.gridHash) {
    //        let gridBox = game.gridHash[coords];

    //        if (gridBox.isNextSource) nextSrc = gridBox;
    //        if (gridBox.isNextDestination) nextDest = gridBox;

    //        gridBox.sprite = gridBox.origSprite;
    //        gridBox.gScore = 0;
    //        gridBox.hScore = 0;
    //        gridBox.fScore = 0;
    //        gridBox._deselect();
    //        gridBox._clearParent();
    //        gridBox._clearDestination();
    //        gridBox._clearSource();
    //     }

    //     delete game.heroPosition;
    //     delete game.heroDestination

    //     nextSrc._setSource()
    //     if(nextDest)
    //     nextDest._setDestination();
    //  }
  }
  return new Grid();
};
