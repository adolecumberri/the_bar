import {
  IGridBox,
  ISprite,
  IGridChair,
  IGridTable,
  IGRID_VALUES,
  IChair,
  IGridHash,
} from "../interfaces";
import { IHero } from "../interfaces/Hero.Interface";
import { Crew } from "./Crew2";

class GridBox {
  // this: IGridBox;
  key: string;
  // gX: number;
  // gY: number;
  xCoord: number;
  yCoord: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: IGRID_VALUES;
  walkable: boolean;
  color: string;
  sprite: ISprite;
  initialColor: string;
  highlighted: boolean;
  hero?: IHero;
  constructor({
    key,
    x,
    y,
    xCoord,
    yCoord,
    width,
    height,
    type,
    walkable,
    color,
    sprite,
  }: IGridBox) {
    this.key = key;
    // this.gX = gX;
    // this.gY = gY;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // vacio, silla, mesa....
    this.walkable = walkable; //se puede andar o no
    this.color = color; //no claro.
    this.initialColor = color; //Color para reestablecer el color principal.
    this.sprite = sprite; //imagen a cargar
    this.highlighted = false; //si esta marcado.
  }

  highlightColor: () => void = () => {
    this.color = `${this.color}55`;
  }
}

class Chair extends GridBox {
  isOccupied?: boolean;
  // hero?: IHero;
  id: number;
  tableId: number;
  dir: "left" | "top" | "right" | "bottom";
  constructor(arg: IGridChair) {
    super(arg);
    this.dir = arg.dir;
    this.isOccupied = arg.isOccupied || false;
    this.walkable = true;
    this.tableId = arg.tableId;
    this.id = arg.id;
    // this.hero = undefined;
  }

  occupyChair = (
    // hero: any
    ) => {
    this.walkable = false;
    this.isOccupied = true;
    // this.hero = hero;
  };

  releaseChair = () => {
    this.walkable = true;
    this.isOccupied = false;
    this.hero = undefined;
  };
};

class Table extends GridBox {
  tableId: number;
  chairsLocation: IChair[] = [];
  chairs: Chair[] = [];
  isOccupied: boolean;
  crew?: Crew;
  constructor(arg: IGridTable) {
    super(arg);
    this.walkable = false;
    this.tableId = arg.tableId;
    this.chairsLocation = arg.chairs;
    this.isOccupied = false;
  }

  //unused
  getChairs = (grid: IGridHash) => {
    let solution: IGridChair[] = [];

    this.chairsLocation.forEach(({ row, col }) => {
      solution.push((grid[`${row}-${col}`] as IGridChair));
    });
    return solution;
  };


  occupyTable = (crew: Crew) => {
    this.isOccupied = true;
    this.crew = crew;

    let heroes = crew.heros;

    if (heroes.length !== this.chairs.length)
      throw new Error(
        `The number of Heroes is different of Chairs number in table.
      Heores: ${heroes.length}
      Chairs: ${this.chairs.length}`
      );


    //Al tener la misma longitud, puedo iterar por las sillas  y usar el index para los heroes.
    this.chairs.forEach((chair, i) => {
      chair.occupyChair(
        // heroes[i]
      );
    });
  }


  unOccupyTable = () => {
    //desocupado.
    this.isOccupied = false;
     //quito el equipo.
     this.crew = undefined;
     //quito los heroes de las sillas
     this.chairs.forEach( c => {
       c.releaseChair();
     });
  }



};


export {
  GridBox as Void,
  Chair,
  Table
}

