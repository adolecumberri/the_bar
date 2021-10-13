
import { IGRID_TYPES, IGRID_VALUES } from "./IConstants";
import { ISprite } from "./ISprites";


//Not sure if usefull
export type IAnyBox = IGridBox | IChair | ITable

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
  type: IGRID_VALUES;
  walkable: boolean;
  color: string;
  initialColor?: string;
  sprite: ISprite;
  highlighted?: boolean;
}

export interface IChair extends IGridBox {  //TODO: no hace falta
  occupied?: boolean;
  hero?: any; //todo: interfaz de heroe
  tableId: number;
  direction?: ""
}

export interface ITable extends IGridBox { //TODO: no hace falta
  tableId: number;
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
