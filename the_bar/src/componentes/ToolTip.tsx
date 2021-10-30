//Entrada del bar

import { FC, useContext } from "react";
import { TILE_SIZE } from "../constants";
import { StyleContext } from "../utility/context";
import { uniqueID } from "../utility/Utility";



interface IToolTip {
    key?: string
    variation?: {top: number, left: number}
}

const ToolTip: FC<IToolTip> = ({ children, key, variation }) => {

    const {top, left} = variation as  {
        top: number;
        left: number;
    } || { top : 0, left: 0 }
    const { pixelSize } = useContext(StyleContext);

    return (
        <>

            <div
                key={key ? key : uniqueID()}
                style={{
                    display: 'block',
                    position: "absolute",
                    top: `${TILE_SIZE * pixelSize + 10 + top}px`,
                    left: `${2 + pixelSize + left}px`,
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    color: "#000000",
                    // border: "1px solid black",
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
                top: ` ${((TILE_SIZE * pixelSize) - (3 * pixelSize)) + 11 + top}px`,
                left: `${3 * pixelSize + left}px`,
                zIndex: 2,
                transform: "rotate(45deg)",
                borderTopLeftRadius: `${ 2 + pixelSize }px`
                // borderTop: "1px solid black",
                // borderLeft: "1px solid black"

            }}
            ></div>
        </>
    );
};

export default ToolTip;