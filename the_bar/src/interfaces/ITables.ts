
export interface IChair {
    col: number,
    row: number
}

export interface ITable {
    id: number;
    col: number;
    row: number;
    sites: number;
    chairs: IChair[];
}