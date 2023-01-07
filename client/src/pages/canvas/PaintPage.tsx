import React, { FC, useState } from "react";
import { Canvas } from "../../components/canvas/canvas/Canvas";
import { SettingBar } from "../../components/canvas/setting-bar/SettingBar";
import { Toolbar } from "../../components/canvas/toolbar/Toolbar";
import style from '../../style/PaintPage.module.scss'

export default function PaintPage() {
    return (
        <div className={style.container}>
            <Toolbar />
            <SettingBar />
            <Canvas />
        </div>
    )
}