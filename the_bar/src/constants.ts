import { IGridConfig, IGRID_TYPES, ITheme, IGRID_VALUES } from "./interfaces";

const TILE_SIZE = 16;
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 160;
// entre el tamaño son
// 40 x 20


const THEME: ITheme = {
  pixelSize: 2,
  canvasWidth: 320,
  canvasHeight: 160,
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
    color: "#e1e1e1",
    sprite: { x: 0, y: 0, width: 32, height: 32 },
  },
  chair: {
    status: "walkable",
    type: GRID_TYPES.CELL_CHAIR as IGRID_VALUES,
    walkable: true,
    color: "#e1e1e1",
    sprite: { x: 0, y: 0, width: 50, height: 50 },
  },
  table: {
    status: "blocked",
    type: GRID_TYPES.CELL_TABLE as IGRID_VALUES,
    walkable: false,
    color: "#f22222",
    sprite: { x: 0, y: 50, width: 50, height: 50 },
  },
};

const TABLES_LOCATIONS = [
  {
    id: 1,
    col: 2,
    row: 0,
    chairs: [
      {
        col: 1,
        row: 0
      },
      {
        col: 3,
        row: 0
      }
    ]
  },
  {
    id: 2,
    col: 1,
    row: 3,
    chairs: [
      {
        col: 0,
        row: 3
      },
      {
        col: 1,
        row: 2
      },
      {
        col: 2,
        row: 3
      }
    ]
  },
  {
    id: 3,
    col: 1,
    row: 5,
    chairs: [
      {
        col: 0,
        row: 5
      },
      {
        col: 2,
        row: 5
      }
    ]
  },
  {
    id: 4,
    col: 4,
    row: 4,
    chairs: [
      {
        col: 4,
        row: 3
      },
      {
        col: 4,
        row: 5
      }
    ]
  },
  {
    id: 5,
    col: 6,
    row: 4,
    chairs: [
      {
        col: 6,
        row: 3
      },
      {
        col: 6,
        row: 5
      }
    ]
  },
  {
    id: 6,
    col: 9,
    row: 4,
    chairs: [
      {
        col: 9,
        row: 3
      },
      {
        col: 8,
        row: 4
      },
      {
        col: 9,
        row: 5
      },
      {
        col: 10,
        row: 4
      }
    ]
  },
  {
    id: 7,
    col: 13,
    row: 4,
    chairs: [
      {
        col: 13,
        row: 3
      },
      {
        col: 12,
        row: 4
      },
      {
        col: 13,
        row: 5
      },
      {
        col: 14,
        row: 4
      }
    ]
  },
  {
    id: 8,
    col: 15,
    row: 2,
    chairs: [
      {
        col: 15,
        row: 1
      },
      {
        col: 15,
        row: 3
      }
    ]
  },
  {
    id: 9,
    col: 13,
    row: 0,
    chairs: [
      {
        col: 12,
        row: 0
      },
      {
        col: 13,
        row: 1
      },
      {
        col: 14,
        row: 0
      }
    ]
  },
]

export {
  TILE_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  THEME,
  GRID_TYPES,
  GRID_CONFIG,
  HERO_TYPE,
  TABLES_LOCATIONS,
};
