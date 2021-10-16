import { IGridChair, IGridBox, IGridTable } from ".";

export type IGridHash = {
    [x: string]: IGridBox | IGridChair | IGridTable
}