import { IChair, IGridBox, ITable } from ".";



export type IGridHash = {
    [x: string]: IGridBox | IChair | ITable
}