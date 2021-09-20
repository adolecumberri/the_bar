//Barra del bar

import React, { FC, useEffect, useRef, useState } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { theme } from "../theme";
import { ITheme, ICoord, ISalon, ITable } from "../interfaces";
import { useRenderCounter } from "../hooks/useRenderCounter";

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    backgroundColor: "burlywood",
  },
  counter: {
    position: "absolute",
  },
}));

let cellSize = 0;

let gameGrid: Cell[][] = [];

const Salon: FC = () => {
  const { container, counter } = useStyles();
  const [count] = useRenderCounter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let canvasWidth = 936;
  let canvasHeight = 480;
  const [salonGrid, setSalonGrid] = useState<ISalon>();

  useEffect(() => {
    //saco el canvas y el contexto 2d
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    //Parrilla logica que relleno y despues meto en el hook "salonGrid"
    let salonLogicalgrid: ISalon = {
      tables: [],
    };
    ctx.lineWidth = 1;
    //Pinto la parrilla del salón
    const handleGameGrid = () => {
      for (let i = 0; i < gameGrid.length; i++) {
        for (let j = 0; j < gameGrid[i].length; j++) {
          gameGrid[i][j].draw();
        }
      }
    };

    //Calcular cell size.
    cellSize = canvasWidth / 36;

    //pinto la parrilla y reanimo.
    const render = () => {
      requestAnimationFrame(render);
    };

    //crea el grid en el elemento grid
    const createGrid: (canvas: any, ctx: CanvasRenderingContext2D) => void = (
      canvas,
      ctx
    ) => {
      for (let y = 0; y < canvas.height; y += cellSize) {
        let row: Cell[] = [];
        for (let x = 0; x < canvas.width; x += cellSize) {
          row.push(new Cell(x, y, ctx));
        }
        gameGrid.push(row);
      }
    };

    //Carga mesas en la parrilla. "i" es el punto 00.
    const loadTables: (i: ICoord, id: number) => void = (i, id) => {
      console.log(i);
      let chairsCoordinates: ICoord[] = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
      ];
      let tableLocation: ICoord[] = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ];
      //Logica table that will be inside the logical Grid. Table has the chairs, id and tables.
      let newLogicalTable: ITable = {
        id: Date.now() + id,
        origin: i,
        chairs: [],
        tables: [],
      };
      chairsCoordinates.forEach((coord, chairId) => {
        try {
          let x = i.x + coord.x;
          let y = i.y + coord.y;
          
          //Adding new Chair in the grid.
          gameGrid[y][x].type = CELL_CHAIR;

          //Adding logical Chair
          newLogicalTable.chairs.push({
            id: Date.now() + chairId,
            coordinates: { x, y },
            occupied: false,
          });
        } catch (e) {
          console.log(
            `chair creation out of bounds. X:${i.x + coord.x} - Y:${
              i.y + coord.y
            }`
          );
        }
      });


      tableLocation.forEach((coord, tableId) => {
        try {
          let x = i.x + coord.x;
          let y = i.y + coord.y;

          gameGrid[y][x].type = CELL_TABLE;

          //adding table coordinates to logical Table
          newLogicalTable.tables.push( { x, y });

        } catch (e) {
          console.log(
            `table creation out of bounds  X:${i.x + coord.x} - Y:${
              i.y + coord.y
            }`
          );
        }
      });
    };

    createGrid(canvas, ctx);
    let tablesLocation: ICoord[] = [
      { x: 4, y: 6 },
      { x: 10, y: 6 },
      { x: 16, y: 6 },
      { x: 22, y: 6 },
      { x: 28, y: 6 },
      { x: 4, y: 11 },
      { x: 10, y: 11 },
      { x: 16, y: 11 },
      { x: 22, y: 11 },
      { x: 28, y: 11 },
    ];
    tablesLocation.forEach((coord, i) => {
      loadTables(coord, i);
    });
    handleGameGrid();
    console.log(gameGrid);
    render();
  }, []);

  return (
    <>
      <canvas
        id="canvas"
        ref={canvasRef}
        className={container}
        width={canvasWidth}
        height={canvasHeight}
      />
      <span className={counter}>{count}</span>
    </>
  );
};

class Cell {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  type: typeof CELL_VOID | typeof CELL_CHAIR | typeof CELL_TABLE;

  constructor(x: number, y: number, canvas: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.ctx = canvas;
    this.type = CELL_VOID;
  }

  draw() {
    // this.ctx.strokeStyle = "black";
    switch (this.type) {
      case CELL_VOID:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;

      case CELL_CHAIR:
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px";
        this.ctx.fillText("chair", this.x, this.y + this.height);
        break;

      case CELL_TABLE:
        this.ctx.fillStyle = "gold";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        break;
    }
  }
}

const CELL_VOID = "void";
const CELL_CHAIR = "chair";
const CELL_TABLE = "table";

export default Salon;
