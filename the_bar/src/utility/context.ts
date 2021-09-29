import React from 'react';
import { THEME } from '../constants';
import {ITheme} from '../interfaces';

export const BarContext = React.createContext<CanvasRenderingContext2D | undefined>(undefined);

export const StyleContext = React.createContext<ITheme>(THEME);


export const pixelSize = React.createContext<string>('2px');


 