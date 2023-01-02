import style from './Toolbar.module.scss'
import React, { FC, useState, useEffect } from 'react'
import { IoIosBrush, IoIosSquare, IoIosRadioButtonOff, IoMdUndo, IoMdRedo, IoMdSave } from 'react-icons/io'
import { BsFillEraserFill, BsSlashLg } from "react-icons/bs";
import toolState from '../../store/toolState';
import Brush from './tools/Brush';
import canvasState from '../../store/canvasState';
import Rect from './tools/Rect';
import Circle from './tools/Circle';
import Line from './tools/Line';
import Eraser from './tools/Eraser';

export const Toolbar: FC = () => {

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        toolState.setFillColor(e.target.value)
    }

    return (
        <div className={style.container}>

            <div className={style.btn_left}>
                <IoIosBrush
                    onClick={() => {
                        canvasState.canvas && toolState.setTool(new Brush(canvasState.canvas))
                    }
                    }
                    className={style.btn_icon}
                />

                <IoIosSquare
                    onClick={() => {
                        canvasState.canvas && toolState.setTool(new Rect(canvasState.canvas))
                    }}
                    className={style.btn_icon}
                />

                <IoIosRadioButtonOff
                    onClick={() => {
                        canvasState.canvas && toolState.setTool(new Circle(canvasState.canvas))
                    }}
                    className={style.btn_icon}
                />
                <BsFillEraserFill
                    onClick={() => {
                        canvasState.canvas && toolState.setTool(new Eraser(canvasState.canvas))
                    }}
                    className={style.btn_icon}
                />
                <BsSlashLg
                    onClick={() => {
                        canvasState.canvas && toolState.setTool(new Line(canvasState.canvas))
                    }}
                    className={style.btn_icon}
                />
                <input
                    type={'color'}
                    className={style.btn_icon}
                    onChange={changeColor}
                />
            </div>

            <div className={style.btn_right}>
                <IoMdUndo onClick={() => { canvasState.undo() }} className={style.btn_icon} />
                <IoMdRedo onClick={() => { canvasState.redo() }} className={style.btn_icon} />
                <IoMdSave onClick={() => { }} className={style.btn_icon} />
            </div>
        </div>
    )
}