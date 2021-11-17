import { IGridConfig, IGRID_TYPES, ITheme, IGRID_VALUES, ICoord } from "../interfaces";
import { ITable } from "../interfaces/ITables";

const CANVAS_ROWS = 6;
const CANVAS_COLS = 16;

const TILE_SIZE = 20;
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 160;
// entre el tamaño son
// 40 x 20


const MONSTERS_VARIATION = 0.15;

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
    type: GRID_TYPES.CELL_VOID as IGRID_VALUES,
    walkable: true,
    color: "#e1e1e1",
    sprite: { x: 0, y: 0, width: 32, height: 32 },
  },
  chair: {
    type: GRID_TYPES.CELL_CHAIR as IGRID_VALUES,
    walkable: true,
    color: "#22f222",
    sprite: { x: 0, y: 0, width: 50, height: 50 },
  },
  table: {
    type: GRID_TYPES.CELL_TABLE as IGRID_VALUES,
    walkable: false,
    color: "#f22222",
    sprite: { x: 0, y: 50, width: 50, height: 50 },
  },
};

const TABLES_IDS: number[] = [1,2,3,4,5,6,7,8,9];

const TABLES_LOCATIONS: ITable[] = [
  {
    id: 1,
    col: 2,
    row: 0,
    sites: 2,
    chairs: [
      {
        id: 1,
        col: 1,
        row: 0,
        dir: "left"
      },
      {
        id: 2,
        col: 3,
        row: 0,
        dir: "right"
      }
    ]
  },
  {
    id: 2,
    col: 1,
    row: 3,
    sites: 3,
    chairs: [
      {
        id: 3,
        col: 0,
        row: 3,
        dir: "left"
      },
      {
        id: 4,
        col: 1,
        row: 2,
        dir: "top"
      },
      {
        id: 5,
        col: 2,
        row: 3,
        dir: "right"
      }
    ]
  },
  {
    id: 3,
    col: 1,
    row: 5,
    sites: 2,
    chairs: [
      {
        id: 6,
        col: 0,
        row: 5,
        dir: "left"
      },
      {
        id: 7,
        col: 2,
        row: 5,
        dir: "right"
      }
    ]
  },
  {
    id: 4,
    col: 4,
    row: 4,
    sites: 2,
    chairs: [
      {
        id: 8,
        col: 4,
        row: 3,
        dir: "top"
      },
      {
        id: 9,
        col: 4,
        row: 5,
        dir: "bottom"
      }
    ]
  },
  {
    id: 5,
    col: 6,
    row: 4,
    sites: 2,
    chairs: [
      {
        id: 10,
        col: 6,
        row: 3,
        dir: "top"
      },
      {
        id: 11,
        col: 6,
        row: 5,
        dir: "bottom"
      }
    ]
  },
  {
    id: 6,
    col: 9,
    row: 4,
    sites: 4,
    chairs: [
      {
        id: 12,
        col: 9,
        row: 3,
        dir: "top"
      },
      {
        id: 13,
        col: 8,
        row: 4,
        dir: "left"
      },
      {
        id: 14,
        col: 9,
        row: 5,
        dir: "bottom"
      },
      {
        id: 15,
        col: 10,
        row: 4,
        dir: "right"
      }
    ]
  },
  {
    id: 7,
    col: 13,
    row: 4,
    sites: 4,
    chairs: [
      {
        id: 16,
        col: 13,
        row: 3,
        dir: "top"
      },
      {
        id: 17,
        col: 12,
        row: 4,
        dir: "left"
      },
      {
        id: 18,
        col: 13,
        row: 5,
        dir: "bottom"
      },
      {
        id: 19,
        col: 14,
        row: 4,
        dir: "right"
      }
    ]
  },
  {
    id: 8,
    col: 15,
    row: 2,
    sites: 2,
    chairs: [
      {
        id: 20,
        col: 15,
        row: 1,
        dir: "top"
      },
      {
        id: 21,
        col: 15,
        row: 3,
        dir: "bottom"
      }
    ]
  },
  {
    id: 9,
    col: 13,
    row: 0,
    sites: 3,
    chairs: [
      {
        id: 22,
        col: 12,
        row: 0,
        dir: "left"
      },
      {
        id: 23,
        col: 13,
        row: 1,
        dir: "bottom"
      },
      {
        id: 24,
        col: 14,
        row: 0,
        dir: "right"
      }
    ]
  },
];

const MISSION_LOCATION: ICoord[] = [
  {
    id: 0,
    x: 0,
    y: 5
  },
  {
   
    id: 1,
    x: 0,
    y: 6
  },
  {
    
    id: 2,
    x: 0,
    y: 7
  },
  {
    id: 3,
    x: 0,
    y: 8
  },
  {
    id: 4,
    x: 0,
    y: 9
  },
  {
    id: 5,
    x: 0,
    y: 10
  },
  {
    id: 6,
    x: 1,
    y: 5
  },
  {
    id: 7,
    x: 1,
    y: 6
  },
  {
    id: 8,
    x: 1,
    y: 7
  },
  {
    id: 9,
    x: 1,
    y: 8
  },
  {
    id: 10,
    x: 1,
    y: 9
  },
  {
    id: 11,
    x: 1,
    y: 10
  },
];

const CREW_STATUS = {
  WAITING_TO_ENTER: "WAITING_TO_ENTER",
  SITTING: "SITTING",
  SITTED: "SITTED",
  SEARCHING_MISION: "SEARCHING_MISION",
  GOING_OUT: "GOING_OUT",
  IN_A_MISSION: "IN_A_MISSION",
  HEALING: "HEALING",
  GONE: "GONE",
  DEAD: "DEAD",
}

//TODO: sustituir esta constante por un objeto funcional.
// const MISSIONS_INFO = {
//   current_grade_allowed: 0,
//   mision_delay: DELAYS.MISSION_DELAY,
//   current_exp: 0,
//   misions_untly_next_grade: [10,20,30,50], //comparo current_exp con mision_untly_next_grade(current_grade_allowed),
// }

export {
  TILE_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  THEME,
  GRID_TYPES,
  GRID_CONFIG,
  HERO_TYPE,
  TABLES_LOCATIONS,
  TABLES_IDS,
  // MISIONS_INFO,
  MISSION_LOCATION,
  CANVAS_ROWS,
  CANVAS_COLS,
  MONSTERS_VARIATION,
  CREW_STATUS,
};
