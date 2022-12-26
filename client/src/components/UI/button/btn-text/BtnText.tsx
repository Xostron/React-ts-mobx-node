import React, { FC } from "react";
import style from "./BtnText.module.scss"


interface IPropsBtnText {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    color?: string;
}

export const BtnText: FC<IPropsBtnText> = ({ children, onClick, color = 'green' }) => {
    return (
        <button color={color} className={style.container} onClick={onClick}>
            {children}
        </button>
    )
}