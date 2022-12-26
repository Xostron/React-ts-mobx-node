import React, { FC } from "react";
import { Canvas } from "../components/canvas/Canvas";
import { SettingBar } from "../components/canvas/SettingBar";
import { Toolbar } from "../components/canvas/Toolbar";
import style from '../style/PaintPage.module.scss'

export default function PaintPage<FC>() {

    return (
        <div className={style.container}>
            <Toolbar />
            <SettingBar />
            <Canvas />
        </div>
    )
}