import { GRID_TYPES } from "../constants";
import { ISprite } from "./ISprites";

export interface IGridCell {}

export interface IGridBox {
  key: string;
  gX: number;
  gY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "walkable" | "blocked";
  constRef:
    | typeof GRID_TYPES.CELL_VOID
    | typeof GRID_TYPES.CELL_CHAIR
    | typeof GRID_TYPES.CELL_TABLE;
  walkable: boolean;
  color: string;
  sprite: ISprite;
}

export interface IGridConfig {
  [x: string]: {
    type: "walkable" | "blocked";
    constRef:
      | typeof GRID_TYPES.CELL_VOID
      | typeof GRID_TYPES.CELL_CHAIR
      | typeof GRID_TYPES.CELL_TABLE;
    walkable: boolean;
    color: string;
    sprite: ISprite;
  };
}

export interface IGridConstructor {
  rows: number;
  cols: number;
  t_width: number;
  t_height: number;
}
