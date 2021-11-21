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
  sprite?: HTMLImageElement;
  xSize?: number;
  ySize?: number;
  xSpriteSize?: number;
  ySpriteSize?: number;
  steps: number;
  sheetType: 'vertical' | 'horizontal';
  visualTransform?: string;
}


export interface IImageContext {
  // 'barTile': IImgAnimation;
  // 'archer': IImgAnimation;
  // 'ninja': IImgAnimation;
  // 'berserker': IImgAnimation;
  // 'deffender': IImgAnimation;
  // 'fencer': IImgAnimation;
  // 'paladin': IImgAnimation;
  // 'sniper': IImgAnimation;
  // 'soldier': IImgAnimation;
  // 'thieve': IImgAnimation;
  // // 'generalCrew': IImgAnimation;
  // 'crew': IImgAnimation;
  [X: number | string]: IImgAnimation;

}//TODO: borrar barBackground. unused