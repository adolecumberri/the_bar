import React from 'react';

export const BarContext = React.createContext<CanvasRenderingContext2D | undefined>(undefined);

export const pixelSize = React.createContext<string>('2px');


 