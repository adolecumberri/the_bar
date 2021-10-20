
export interface IChair {
    col: number,
    row: number,
    dir: "top" | "right" | "left" | "bottom"; 
}

export interface ITable {
    id: number;
    col: number;
    row: number;
    sites: number;
    chairs: IChair[];
}