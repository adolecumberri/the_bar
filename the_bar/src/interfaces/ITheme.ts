export interface ITheme  {
    pixelSize: IPixelSize,
    canvasWidth: number,
    canvasHeight: number,
    height: number,
    width: number,
}


export type IPixelSize = 1 | 2 | 3 | 4 | 2.5  | 1.5 | 0.75;