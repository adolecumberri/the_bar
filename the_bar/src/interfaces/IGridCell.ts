
import { IChair, IGRID_VALUES, ISprite } from ".";

export type IAnyBox = IGridBox | IGridChair | IGridTable

export interface IGridBox {
  key: string;
  // gX: number;
  // gY: number;
  xCoord: number,
  yCoord: number,
  x: number;
  y: number;
  width: number;
  height: number;
  type: IGRID_VALUES;
  walkable: boolean;
  color: string;
  initialColor?: string;
  sprite: ISprite;
  highlighted?: boolean;
}

export interface IGridChair extends IGridBox {  //TODO: no hace falta
  isOccupied: boolean;
  hero?: any; //todo: interfaz de heroe
  tableId: number;
  dir: "left" | "top" | "right" | "bottom",
  
}

export interface IGridTable extends IGridBox { //TODO: no hace falta
  tableId: number;
  chairs: IChair[];
  sites: number;
  isOccupied: boolean;
}

export type IStatus = "walkable" | "blocked" | "occupied" | "free"; //Todo: no hace falta



export type IGridConfig = {
  [x in IGRID_VALUES]: {
    type: IGRID_VALUES;
    walkable: boolean;
    color: string;
    sprite: ISprite;
  };
};

export interface IGridConstructor {
  rows: number;
  cols: number;
  t_width: number;
  t_height: number;
}
