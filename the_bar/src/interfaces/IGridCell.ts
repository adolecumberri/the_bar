
import { ISprite } from "./ISprites";


//Not sure if usefull
export interface IGridCell {}

//

export interface IGridBox {
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
}

export interface IChair extends IGridBox {
  occupied: boolean;
  hero?: any; //todo: interfaz de heroe
}


export type IStatus = "walkable" | "blocked" | "occupied" | "free";

export interface IGRID_TYPES {
  CELL_VOID: string,
  CELL_CHAIR: string,
  CELL_TABLE: string,
};

export type IGRID_VALUES = "void" | "chair" | "table";

export type IGridConfig = {
  [x in IGRID_VALUES]: {
    status: IStatus;
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
