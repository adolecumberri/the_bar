import {
  IGridBox,
  ISprite,
  IGridChair,
  IGridTable,
  IGRID_VALUES,
  IChair,
  IGridHash,
} from "../interfaces";

class GridBox {
  // this: IGridBox;
  key: string;
  gX: number;
  gY: number;
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
  constructor({
    key,
    gX,
    gY,
    x,
    y,
    width,
    height,
    type,
    walkable,
    color,
    sprite,
  }: IGridBox) {
    this.key = key;
    this.gX = gX;
    this.gY = gY;
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
  hero?: any;
  tableId: number;
  constructor(arg: IGridChair) {
    super(arg);

    this.isOccupied = arg.isOccupied || false;
    this.walkable = true;
    this.tableId = arg.tableId;
  }

  occupyChair = (hero: any) => {
    this.walkable = false;
    this.isOccupied = true;
    this.hero = hero;
  };

  releaseChair = () => {
    this.walkable = true;
    this.isOccupied = false;
    this.hero = null;
  };
};

class Table extends GridBox {
  tableId: number;
  chairs: IChair[];
  isOccupied: boolean;
  constructor(arg: IGridTable) {
    super(arg);
    this.walkable = false;
    this.tableId = arg.tableId;
    this.chairs = arg.chairs;
    this.isOccupied = false;
  }

  getChairs = (grid: IGridHash) => {
    let solution: IGridChair[] = [];

    this.chairs.forEach(({ row, col }) => {
      solution.push((grid[`${row}-${col}`] as IGridChair));
    });
    return solution;
  };

  

};


export {
  GridBox as Void,
  Chair,
  Table
}

