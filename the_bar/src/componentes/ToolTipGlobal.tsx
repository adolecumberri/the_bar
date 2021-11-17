//Entrada del bar

import React, { FC, ReactNode, useContext } from "react";
import { TILE_SIZE } from "../constants";
import { StyleContext } from "../utility/context";
import { uniqueID } from "../utility/Utility";



interface IToolTip {
    key?: string
    // variation?: {top: number, left: number}
    content?: ReactNode,
    hidden: boolean
}

const ToolTipGlobal: FC<IToolTip> = ({ children, key, content, hidden }) => {

    const { pixelSize } = useContext(StyleContext);

    if (hidden) {
        return <></>;
    }

    return (
        <>
            <div
                key={key ? key : uniqueID()}
                style={{
                    display: 'block',
                    position: "absolute",
                    bottom: "0px",
                    left: '0px',
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000000",
                    border: "1px solid black",
                    padding: "16px",
                    zIndex: 2,
                    minWidth: `${(TILE_SIZE * pixelSize) + 32}px`,
                     maxWidth: `${(288) + 32}px`,
                    minHeight: `${TILE_SIZE * pixelSize * 4}px`
                }}
            >
                {children}
            </div>
        </>
    );
};

export default ToolTipGlobal;