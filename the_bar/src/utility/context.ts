import React from 'react';
import { THEME } from '../constants';
import {IImageContext, ITheme} from '../interfaces';

let defaultImageContext:IImageContext = {
    batTile: {
        title: "barTile",
        img:  (new Image().setAttribute("alt", '../sprites/bar_tile.png') as any as HTMLImageElement),
        xSize: 50,
        ySize: 50,
    },
}

// export const BarContext = React.createContext<CanvasRenderingContext2D | undefined>(undefined);

export const StyleContext = React.createContext<ITheme>(THEME);

export const ImagesContext = React.createContext<IImageContext>(defaultImageContext)

export const pixelSize = React.createContext<string>('2px');



//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     },
//     {
//         title:,
//         route:,
//         extension:,
//     }
// ]
 