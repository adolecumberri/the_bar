//Entrada del bar

import React, { FC, useContext, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/styles";

import { THEME } from '../constants/constants';
import { ITheme } from "../interfaces";
import { ImagesContext, loadBoxDimensions, StyleContext } from "../utility";
import { useRenderCounter } from "../hooks";

const useStyles = makeStyles(() => {
    return (
        {
            container: {}
        }
    )
}

);

const BarEntry: FC = () => {
    // let { container } = useStyles();
    const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);
    const a = useContext(ImagesContext);
    console.log({a});
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

    return <div style={container}>
        <span style={{ position: "absolute" }}>{count}</span>

    </div>;
};

export default BarEntry;
