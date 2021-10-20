
import { GRID_CONFIG, TABLES_LOCATIONS } from "../constants/constants";
import { IGridConstructor, IGridHash, IGRID_VALUES, IGridTable } from "../interfaces";
import { Chair, Table, Void } from "./GridBoxesTypes";


export class Grid {
  constructor(customGrid?: IGridHash) {
    this.hashGrid = customGrid as IGridHash;
  }
  topMargin = 2;
  //las keys son col-row OR X-Y
  hashGrid: IGridHash = {};
  tables: Table[] = [];
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

        let gridBox = new Void({
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

      //creation.
      let gridBox = new Table({
        key,
        ...this._loadBoxBasicVariables({ X, Y, height, width }),
        width,
        height,
        isOccupied: false,
        tableId,
        ...gridTypeConfig,
        chairs: TABLES_LOCATIONS[i].chairs,
        sites: TABLES_LOCATIONS[i].sites,
      });

      //añado mesa al array de mesas y al gridHash
      gridHash[key] = gridBox;
      this.tables.push(gridBox);

      //Creación de sillas.
      TABLES_LOCATIONS[i].chairs.forEach(({ col, row, dir }) => {
        X = col;
        Y = row;

        let key = `${X}-${Y}`;
        //configuración basica para sillas
        gridTypeConfig = GRID_CONFIG.chair;

        let chairBox = new Chair({
          key,
          ...this._loadBoxBasicVariables({ X, Y, height, width }),
          width,
          height,
          tableId,
          dir,
          isOccupied: false,
          ...gridTypeConfig
        });

        gridBox.chairs.push(chairBox);
        gridHash[key] = chairBox;
      });
    }


    for (let Y = 0; Y <= rows - 1; Y++) {
      for (let X = 0; X <= cols - 1; X++) {
        //variables.
        let key = `${X}-${Y}`;

        if (!gridHash[key]) {
          let gridTypeConfig = GRID_CONFIG.void;

          let gridBox = new Void({
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
    let solution: Table[] = [];

    
    if(!this.hashGrid) debugger;

    //si no hay hashGrid, devuelve un array vacio
    if(!this.hashGrid) return [];


    TABLES_LOCATIONS.forEach(({ row, col, chairs }) => {
      let key = `${col}-${row}`;
      if (!(this.hashGrid[key] as Table)) debugger;

      if (!(this.hashGrid[key] as Table).isOccupied) {
        solution.push(this.hashGrid[key] as Table);
      }
    });

    return solution;
  }

  getFreeTablesBySize = (size: number) => {
    let solution: Table[] = [];

    //si no hay hashGrid, devuelve un array vacio
    if(!this.hashGrid) return [];


    TABLES_LOCATIONS.forEach(({ row, col, chairs }) => {
      let key = `${col}-${row}`;
      if (!(this.hashGrid[key] as Table)) debugger;

      if (!(this.hashGrid[key] as Table).isOccupied && (this.hashGrid[key] as Table).chairs.length === size) {
        solution.push(this.hashGrid[key] as Table);
      }
    });

    return solution;
  }

}

// export interface IGrid {
//   Grid:typeof Grid;
// }