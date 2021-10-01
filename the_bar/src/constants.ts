import { IGridConfig, ITheme } from "./interfaces";

const TILE_SIZE = 16;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 320;

const THEME: ITheme = {
  pixelSize: 2,
};

const GRID_TYPES = {
  CELL_VOID: "void",
  CELL_CHAIR: "chair",
  CELL_TABLE: "table",
};

const HERO_TYPE = {
  ARCHER: "archer",
  SOLDIER: "soldier",
};

const GRID_CONFIG: IGridConfig = {
  [GRID_TYPES.CELL_VOID]: {
    type: "walkable",
    constRef: GRID_TYPES.CELL_VOID,
    walkable: true,
    color: "#d2d2d2",
    sprite: { x: 0, y: 150, width: 50, height: 50 },
  },
  [GRID_TYPES.CELL_CHAIR]: {
    type: "walkable",
    constRef: GRID_TYPES.CELL_CHAIR,
    walkable: true,
    color: "#80cccc",
    sprite: { x: 0, y: 0, width: 50, height: 50 },
  },
  [GRID_TYPES.CELL_TABLE]: {
    type: "blocked",
    constRef: GRID_TYPES.CELL_TABLE,
    walkable: false,
    color: "#7a7a7a",
    sprite: { x: 0, y: 50, width: 50, height: 50 },
  },
};

export {
  TILE_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  THEME,
  GRID_TYPES,
  GRID_CONFIG,
  HERO_TYPE,
};
