//Entrada del bar

import React, { FC, useContext, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { THEME } from '../constants/constants';
import { IImageContext, ITheme } from "../interfaces";
import { ImagesContext, loadBoxDimensions, StyleContext } from "../utility";
import { useRenderCounter } from "../hooks";
import { IHeroCreated } from "../interfaces/Hero.Interface";

const useStyles = makeStyles(() => {
    return (
        {
            container: {}
        }
    )
});

interface barProps {
    crewsAtDoor: IHeroCreated[]
}

const BarEntry: FC<barProps> = ({crewsAtDoor}) => {
    // let { container } = useStyles();
    const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);

    const barImgs = useContext(ImagesContext);
    console.log({ barImgs });
    const [count] = useRenderCounter();
    console.log({ pixelSize, canvasHeight, canvasWidth });
    const { height, width } = loadBoxDimensions({
        rows: 6,
        cols: 16,
        t_width: canvasWidth * pixelSize,
        t_height: canvasHeight * pixelSize,
        topMargin: 2
    });

    let style = {
        width,
        height,
        border: "1px solid black",
        backgroundColor: "wheat"
    }

    let container = {
        height: (canvasHeight * pixelSize) - (height * 3),
        width: width,
        border: "1px solid black",
        marginTop: height * 3
    };

let heroesInQueue = ( ) => {
    let solution = [];
    crewsAtDoor.forEach( ( hero )=> {
        //barImgs[((hero.className as string).toLowerCase() as key of typeof IImageContext)].img
        debugger;
        let type = hero.className.toLocaleLowerCase() as keyof  IImageContext;
        let barImg = barImgs[type].img
       solution.push( barImg );
    })
}

    return <div style={container}>
        <span style={{ position: "absolute" }}>{count}</span>
{heroesInQueue()}
    </div>;
};

export default BarEntry;
