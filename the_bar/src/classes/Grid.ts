import { TableSortLabel } from "@material-ui/core";
import { GRID_CONFIG, TABLES_LOCATIONS } from "../constants";
import { IGridConstructor, IGridHash } from "../interfaces";
import { GridBoxesTypes } from "./GridBoxesTypes";

export const Grid = () => {

  const topMargin = 2;
  class Grid {
    _initNewVoidGrid = ({ rows, cols, t_width, t_height }: IGridConstructor) => {

      const { height, width } = this._loadBoxDimensions({ cols, rows, t_height, t_width })
      let gridHash: IGridHash = {};

      for (let Y = 0; Y <= rows - 1; Y++) {
        for (let X = 0; X <= cols - 1; X++) {
          //variables.
          let key = `${X}-${Y}`;
          let gridTypeConfig = GRID_CONFIG.void;

          let gridBox = new GridBoxesTypes.Void({
            key, ...this._loadBoxBasicVariables({ X, Y, height, width }), width, height, ...gridTypeConfig
          })

          gridHash[key] = gridBox;
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


        }
      }
      console.log({ gridHash });
      return gridHash;
    };


    _initNewGridWithTables = ({ rows, cols, t_width, t_height }: IGridConstructor) => {
      // +2 es porque dejo un margen de "falsa pared"

      const { height, width } = this._loadBoxDimensions({ cols, rows, t_height, t_width })
      let gridHash: IGridHash = {};



      for (let i = 0; i < TABLES_LOCATIONS.length; i++) {
        // if (!TABLES_LOCATIONS[i]) {
        //   console.log(TABLES_LOCATIONS);
        //   debugger;
        // }
        //Table info.
        let X = TABLES_LOCATIONS[i].col;
        let Y = TABLES_LOCATIONS[i].row;
        let tableId = TABLES_LOCATIONS[i].id;

        let key = `${X}-${Y}`;
        let gridTypeConfig = GRID_CONFIG.table;

        let gridBox = new GridBoxesTypes.Table({
          key, ...this._loadBoxBasicVariables({ X, Y, height, width }), width, height, tableId, ...gridTypeConfig
        });
        gridHash[key] = gridBox;

        //Creación de sillas.
        TABLES_LOCATIONS[i].chairs.forEach(({ col, row }) => {
          X = col;
          Y = row;

          let key = `${X}-${Y}`;
          gridTypeConfig = GRID_CONFIG.chair;

          let gridBox = new GridBoxesTypes.Chair({
            key, ...this._loadBoxBasicVariables({ X, Y, height, width }), width, height, tableId, ...gridTypeConfig
          });
          gridHash[key] = gridBox;
        });
      }


      for (let Y = 0; Y <= rows - 1; Y++) {
        for (let X = 0; X <= cols - 1; X++) {
          //variables.
          let key = `${X}-${Y}`;

          if (!gridHash[key]) {
            let gX = X;
            let gY = Y;
            let x = X * width;
            let y = (Y + topMargin) * height; // por la falsa pared
            let gridTypeConfig = GRID_CONFIG.void;

            let gridBox = new GridBoxesTypes.Void({
              key, gX, gY, x, y, width, height, ...gridTypeConfig
            })
            gridHash[key] = gridBox;
          }



        }
      }
      console.log({ gridHash });
      return gridHash;
    };


    _loadBoxDimensions = ({ t_width, cols, t_height, rows }: {
      t_width: number;
      cols: number;
      t_height: number;
      rows: number;
    }) => {
      if (t_width % cols || t_height % (rows + topMargin))
        throw new Error(
          "Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!"
        );

      let width = t_width / cols;
      let height = t_height / (rows + topMargin);

      return { width, height }
    }

    _loadBoxBasicVariables = ({ X, Y, width, height }: {
      X: number;
      Y: number;
      width: number;
      height: number;
    }) => {

      let gX = X,
        gY = Y,
        x = X * width,
        y = (Y + topMargin) * height; // por la falsa pared

      return { gX, gY, x, y }
    }
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
