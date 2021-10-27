//Entrada del bar

import React, { FC, useCallback, useContext, useEffect } from "react";
import { TILE_SIZE } from "../constants";
import { StyleContext } from "../utility/context";
import { uniqueID } from "../utility/Utility";



interface IToolTip {
    key?: string
}

const ToolTip: FC<IToolTip> = ({ children, key }) => {


    const { pixelSize, canvasHeight, canvasWidth } = useContext(StyleContext);

    return (
        <>

<div
                  key={key ? key : uniqueID}
                  style={{
                    display: 'block',
                    position: "absolute",
                    top: `${TILE_SIZE * pixelSize + 10}px`,
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000000",
                    border: "1px solid black",
                    padding: "16px",
                    zIndex: 2,
                    minWidth: `${TILE_SIZE * pixelSize * 3}px`
                  }}
                >
                  {/* tittle */}
                  {children}
                </div>
                <div style={{
                  width: `${6 * pixelSize}px`,
                  height: `${6 * pixelSize}px`,
                  background: "white",
                  position: "absolute",
                  top: ` ${((TILE_SIZE * pixelSize) - (3 * pixelSize)) + 11}px`,
                  left: `${3 * pixelSize}px`,
                  zIndex: 2,
                  transform: "rotate(45deg)",
                  borderTop: "1px solid black",
                  borderLeft: "1px solid black"

                }}
                ></div>
        </>
    );
};

export default ToolTip;