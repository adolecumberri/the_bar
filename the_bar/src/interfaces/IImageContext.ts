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
  xSize: number;
  ySize: number;
}


export interface IImageContext {
  'barTile': IImgAnimation;
  'archer': IImgAnimation;
  'ninja': IImgAnimation;
  'berserk': IImgAnimation;
  'defender': IImgAnimation;
  'fencer': IImgAnimation;
  'paladin': IImgAnimation;
  'sniper': IImgAnimation;
  'soldier': IImgAnimation;
  'thieve': IImgAnimation;

}//TODO: borrar barBackground. unused