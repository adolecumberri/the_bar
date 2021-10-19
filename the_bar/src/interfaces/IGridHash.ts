import { IGridChair, IGridBox, IGridTable } from ".";
import { Chair, Table, Void } from "../classes/GridBoxesTypes";

export type IGridHash = {
    [x: string]: Void | Chair | Table
}