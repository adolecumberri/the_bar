
import { IChair, IGRID_VALUES, ISprite } from ".";

export type IAnyBox = IGridBox | IGridChair | IGridTable

export interface IGridBox {
  key: string;
  gX: number;
  gY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  status: IStatus;
  type: IGRID_VALUES;
  walkable: boolean;
  color: string;
  initialColor?: string;
  sprite: ISprite;
  highlighted?: boolean;
}

export interface IGridChair extends IGridBox {  //TODO: no hace falta
  occupied?: boolean;
  hero?: any; //todo: interfaz de heroe
  tableId: number;
  direction?: ""
}

export interface IGridTable extends IGridBox { //TODO: no hace falta
  tableId: number;
  chairs: IChair[];
  sites: number;
}

export type IStatus = "walkable" | "blocked" | "occupied" | "free";



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
