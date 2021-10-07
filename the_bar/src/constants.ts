import { IGridConfig, IGRID_TYPES, ITheme } from "./interfaces";
import { IGRID_VALUES } from "./interfaces/IGridCell";

const TILE_SIZE = 16;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 320;

const THEME: ITheme = {
  pixelSize: 2,
};

const GRID_TYPES: IGRID_TYPES = {
  CELL_VOID: "void",
  CELL_CHAIR: "chair",
  CELL_TABLE: "table",
};

const HERO_TYPE = {
  ARCHER: "archer",
  SOLDIER: "soldier",
};

const GRID_CONFIG: IGridConfig = {
  void: {
    status: "walkable",
    type: GRID_TYPES.CELL_VOID as IGRID_VALUES,
    walkable: true,
    color: "#d2d2d2",
    sprite: { x: 0, y: 150, width: 50, height: 50 },
  },
  chair: {
    status: "walkable",
    type: GRID_TYPES.CELL_CHAIR as IGRID_VALUES,
    walkable: true,
    color: "#80cccc",
    sprite: { x: 0, y: 0, width: 50, height: 50 },
  },
  table: {
    status: "blocked",
    type: GRID_TYPES.CELL_TABLE as IGRID_VALUES,
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
