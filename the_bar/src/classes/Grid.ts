import { TableSortLabel } from "@material-ui/core";
import { GRID_CONFIG, TABLES_LOCATIONS } from "../constants/constants";
import { IGridConstructor, IGridHash, IGRID_VALUES, ITable } from "../interfaces";
import { GridBoxesTypes } from "./GridBoxesTypes";


export class Grid {
  constructor(customGrid?: IGridHash) {
    this.hashGrid = customGrid as IGridHash;
  }
  topMargin = 2;
  hashGrid: IGridHash = {};
  //cada vez que una funcion quiera triggear un render, ++ a esa variable. y lo controlo fuera.
  //así el useEffect no checkea un objeto complejo.
  triggerUpdate: number = 0;  // unused
  tablesInfo = TABLES_LOCATIONS; //constant used to create the tables and chairs;
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

    //Load cell-height and cell-width
    const { height, width } = this._loadBoxDimensions({ cols, rows, t_height, t_width })
    let gridHash: IGridHash = {};

    //following Tables_locations scheme
    for (let i = 0; i < TABLES_LOCATIONS.length; i++) {
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
          let gridTypeConfig = GRID_CONFIG.void;

          let gridBox = new GridBoxesTypes.Void({
            key, ...this._loadBoxBasicVariables({ X, Y, height, width }), width, height, ...gridTypeConfig
          })
          gridHash[key] = gridBox;
        }



      }
    }
    console.log({ gridHash });
    this.hashGrid = gridHash;
    // return gridHash;
  };

  _loadBoxDimensions = ({ t_width, cols, t_height, rows }: {
    t_width: number;
    cols: number;
    t_height: number;
    rows: number;
  }) => {
    if (t_width % cols || t_height % (rows + this.topMargin))
      throw new Error(
        "Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!"
      );

    let width = t_width / cols;
    let height = t_height / (rows + this.topMargin);

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
      y = (Y + this.topMargin) * height; // por la falsa pared

    return { gX, gY, x, y }
  }

  highlight = (type: IGRID_VALUES) => {
    for (let cell in this.hashGrid) {
      if (this.hashGrid[cell].type === type) {
        this.hashGrid[cell].color = "#e1e1e1";
        this.hashGrid[cell].highlighted = true;
      }
      // else{
      //   this.hashGrid[cell].color = this.hashGrid[cell].initialColor as string;
      //   this.hashGrid[cell].highlighted = false;
      // }
    }
    this.triggerUpdate = this.triggerUpdate + 1; //trigger updates
  }

  stopHighlighting = () => {
    for (let cell in this.hashGrid) {
      this.hashGrid[cell].color = this.hashGrid[cell].initialColor as string;
      this.hashGrid[cell].highlighted = false;
    }
    this.triggerUpdate = this.triggerUpdate + 1; //trigger updates
  }

  //returns table's hash key and chairs.
  getFreeTables = () => {

  }

}

// export interface IGrid {
//   Grid:typeof Grid;
// }