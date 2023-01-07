import style from './Toolbar.module.scss'
import React, { FC, useState, useEffect } from 'react'
import { IoIosBrush, IoIosSquare, IoIosRadioButtonOff, IoMdUndo, IoMdRedo, IoMdSave } from 'react-icons/io'
import { BsFillEraserFill, BsSlashLg } from "react-icons/bs";
import toolState from '../../../store/canvas/toolState';
import Brush from '../tools/Brush';
import canvasState from '../../../store/canvas/canvasState';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

export const Toolbar: FC = () => {
    const download = () => {
        const imgData = canvasState.canvas.toDataURL()
        const link = document.createElement('a')
        link.href = imgData
        link.download = canvasState.sessionid + '.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <div className={style.container}>

            <div className={style.btn_left}>
                <IoIosBrush
                    onClick={() => {
                        canvasState.canvas && canvasState.socket &&
                            toolState.tool.fillColor && toolState.tool.strokeColor &&
                            toolState.tool.lineWidth &&
                            toolState.setTool(new Brush(canvasState.canvas, canvasState.socket,
                                canvasState.sessionid, toolState.tool.fillColor, toolState.tool.strokeColor,
                                toolState.tool.lineWidth))
                    }
                    }
                    className={style.btn_icon}
                />

                <IoIosSquare
                    onClick={() => {
                        canvasState.canvas && canvasState.socket &&
                            toolState.tool.fillColor && toolState.tool.strokeColor &&
                            toolState.tool.lineWidth &&
                            toolState.setTool(new Rect(canvasState.canvas, canvasState.socket,
                                canvasState.sessionid, toolState.tool.fillColor, toolState.tool.strokeColor,
                                toolState.tool.lineWidth))
                    }}
                    className={style.btn_icon}
                />

                <IoIosRadioButtonOff
                    onClick={() => {
                        canvasState.canvas && canvasState.socket &&
                            toolState.tool.fillColor && toolState.tool.strokeColor &&
                            toolState.tool.lineWidth &&
                            toolState.setTool(new Circle(canvasState.canvas, canvasState.socket,
                                canvasState.sessionid, toolState.tool.fillColor, toolState.tool.strokeColor,
                                toolState.tool.lineWidth))
                    }}
                    className={style.btn_icon}
                />
                <BsFillEraserFill
                    onClick={() => {
                        canvasState.canvas && canvasState.socket &&
                            toolState.tool.fillColor && toolState.tool.strokeColor &&
                            toolState.tool.lineWidth &&
                            toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket,
                                canvasState.sessionid, toolState.tool.fillColor, toolState.tool.strokeColor,
                                toolState.tool.lineWidth))
                    }}
                    className={style.btn_icon}
                />
                <BsSlashLg
                    onClick={() => {
                        canvasState.canvas && canvasState.socket &&
                            toolState.tool.fillColor && toolState.tool.strokeColor &&
                            toolState.tool.lineWidth &&
                            toolState.setTool(new Line(canvasState.canvas, canvasState.socket,
                                canvasState.sessionid, toolState.tool.fillColor, toolState.tool.strokeColor,
                                toolState.tool.lineWidth))
                    }}
                    className={style.btn_icon}
                />

            </div>

            <div className={style.btn_right}>
                <IoMdUndo onClick={() => { canvasState.undo() }} className={style.btn_icon} />
                <IoMdRedo onClick={() => { canvasState.redo() }} className={style.btn_icon} />
                <IoMdSave onClick={() => { download() }} className={style.btn_icon} />
            </div>
        </div>
    )
}