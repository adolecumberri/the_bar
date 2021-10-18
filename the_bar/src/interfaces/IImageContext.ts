// export interface IImageContext {
//   barTile: {
//     title: string;
//     img: HTMLImageElement;
//     xSize: number;
//     ySize: number;
//   };
// }

export interface IImgAnimation {
  name: string;
  animationDir?: string;
  img: HTMLImageElement;
  xSize: number | string;
  ySize: number | string;
  steps: number;
  sheetType: 'vertical' | 'horizontal';
}


export interface IImageContext {
  'barTile': IImgAnimation;
  'archer': IImgAnimation;
  'ninja': IImgAnimation;
  'berserker': IImgAnimation;
  'deffender': IImgAnimation;
  'fencer': IImgAnimation;
  'paladin': IImgAnimation;
  'sniper': IImgAnimation;
  'soldier': IImgAnimation;
  'thieve': IImgAnimation;

}//TODO: borrar barBackground. unused