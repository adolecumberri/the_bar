
import { IGridBox, ISprite, IGRID_TYPES, IStatus, IChair } from "../interfaces";
import { GRID_TYPES } from "../constants";

class GridBox {
  // this: IGridBox;
  key: string;
  gX: number;
  gY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  status: IStatus;
  type?: IGRID_TYPES;
  walkable: boolean;
  color: string;
  sprite: ISprite;
  constructor({
    key,
    gX,
    gY,
    x,
    y,
    width,
    height,
    type,
    status,
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
    this.status = status; // andable o no, ocupado o no.
    this.color = color;  //no claro.
    this.sprite = sprite; //imagen a cargar

  }


  setStatus: (status: IStatus) => void = status => {
    if (status === "walkable") {
      this.status = status;
      this.walkable = true;
    } else if (status === "blocked") {
      this.status = status;
      this.walkable = false;
    } else if(status === "occupied"){
      this.status = status;
      this.walkable = false;
    } else if (status === "free"){
      this.status = status;
      this.walkable = true;
    }
  }

}
export const GridBoxesTypes: any = {
  Chair: class Chair extends GridBox {
    occupied: boolean
    constructor(arg: IChair){
      super(arg);
      this.occupied = arg.occupied;
    }
  }
};