
import { GRID_CONFIG, TABLES_LOCATIONS } from "../constants/constants";
import { IGridConstructor, IGridHash, IGRID_VALUES } from "../interfaces";
import { Chair, Table, Void } from "./GridBoxesTypes";


export class Grid {
  t_width: number = 0;
  cols: number = 0;
  t_height: number = 0;
  rows: number = 0;

  constructor({ t_height, t_width, cols, rows }: { [x: string]: number }) {
    this.rows = rows;
    this.cols = cols;
    this.t_height = t_height;
    this.t_width = t_width;

    this._initNewGridWithTables();
  }

  topMargin = 2;
  hashGrid: IGridHash = {};//las keys son col-row OR X-Y
  tables: Table[] = [];
  tablesInfo = TABLES_LOCATIONS; //constant used to create the tables and chairs;

  //inicia la grid.
  _initNewGridWithTables = () => {

    //Load cell-height and cell-width
    const { height, width } = this._loadBoxDimensions()
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
        xCoord: X,
        yCoord: Y,
        key,
        x: X * width,
        y: (Y + this.topMargin) * height,
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
      TABLES_LOCATIONS[i].chairs.forEach(({id: chairId, col, row, dir }) => {
        X = col;
        Y = row;

        let key = `${X}-${Y}`;
        //configuración basica para sillas
        gridTypeConfig = GRID_CONFIG.chair;

        let chairBox = new Chair({
          key,
          xCoord: X,
          yCoord: Y,
          x: X * width,
          y: (Y + this.topMargin) * height,
          width,
          height,
          tableId,
          id: chairId as number,
          dir,
          isOccupied: false,
          ...gridTypeConfig
        });

        gridBox.chairs.push(chairBox);
        gridHash[key] = chairBox;
      });
    }


    for (let Y = 0; Y <= this.rows - 1; Y++) {
      for (let X = 0; X <= this.cols - 1; X++) {
        //variables.
        let key = `${X}-${Y}`;

        if (!gridHash[key]) {
          let gridTypeConfig = GRID_CONFIG.void;

          let gridBox = new Void({
            key,
            xCoord: X,
            yCoord: Y,
            x: X * width,
            y: (Y + this.topMargin) * height,
            width, height, ...gridTypeConfig
          })
          gridHash[key] = gridBox;
        }



      }
    }
    this.hashGrid = gridHash;
    // return gridHash;
  };

  _loadBoxDimensions = () => {
    if (this.t_width % this.cols || this.t_height % (this.rows + this.topMargin))
      throw new Error(
        "Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!"
      );

    let width = this.t_width / this.cols;
    let height = this.t_height / (this.rows + this.topMargin);

    return { width, height }
  }

  _updateBoxDimensions = ({ newWidth, newHeight }: {
    newWidth: number;
    newHeight: number;
  }) => {
    if (newWidth % this.cols || newHeight % (this.rows + this.topMargin))
      throw new Error(
        "Error creating game grid: Please ensure that the desired column and row counts divide evenly into the total width and height of the level!"
      );

    this.t_width = newWidth;
    this.t_height = newHeight;


    let width = newWidth / this.cols;
    let height = newHeight / (this.rows + this.topMargin);
    let keys = Object.keys(this.hashGrid);

    keys.forEach(key => {
      this.hashGrid[key].width = width;
      this.hashGrid[key].height = height;
      this.hashGrid[key].x = this.hashGrid[key].xCoord * width;
      this.hashGrid[key].y = (this.hashGrid[key].yCoord + this.topMargin) * height
    });

  }

  // highlight = (type: IGRID_VALUES) => {
  //   for (let cell in this.hashGrid) {
  //     if (this.hashGrid[cell].type === type) {
  //       this.hashGrid[cell].color = "#e1e1e1";
  //       this.hashGrid[cell].highlighted = true;
  //     }
  //   }
  // }

  // stopHighlighting = () => {
  //   for (let cell in this.hashGrid) {
  //     this.hashGrid[cell].color = this.hashGrid[cell].initialColor as string;
  //     this.hashGrid[cell].highlighted = false;
  //   }
  // }

  //returns table's hash key and chairs.
  getFreeTables = () => {
    let solution: Table[] = [];

    if (!this.hashGrid) debugger;

    //si no hay hashGrid, devuelve un array vacio
    if (!this.hashGrid) return [];

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
    if (!this.hashGrid) return [];


    TABLES_LOCATIONS.forEach(({ row, col, chairs }) => {
      let key = `${col}-${row}`;
      if (!(this.hashGrid[key] as Table)) debugger;

      if (!(this.hashGrid[key] as Table).isOccupied && (this.hashGrid[key] as Table).chairs.length === size) {
        solution.push(this.hashGrid[key] as Table);
      }
    });

    return solution;
  }

  liberateTableFromCrew = (tableId: number) => {
    //consigo la key de la mesa seleccionada.
    let tableKey = this.tables.find(t => t.tableId === tableId)?.key as string;
    //saco la mesa.
    let table = (this.hashGrid[tableKey] as Table);
    if (!table) debugger;

    //desocupar
    table.unOccupyTable();
  }

}
