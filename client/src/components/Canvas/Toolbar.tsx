import style from './Toolbar.module.scss'
import React, { FC } from 'react'
import { IoIosBrush, IoIosSquare, IoIosRadioButtonOff, IoMdUndo, IoMdRedo, IoMdSave } from 'react-icons/io'
import { BsFillEraserFill, BsSlashLg } from "react-icons/bs";

export const Toolbar: FC = () => {
    return (
        <div className={style.container}>

            <div className={style.btn_left}>
                <IoIosBrush onClick={() => { }} className={style.btn_icon} />
                <IoIosSquare onClick={() => { }} className={style.btn_icon} />
                <IoIosRadioButtonOff onClick={() => { }} className={style.btn_icon} />
                <BsFillEraserFill onClick={() => { }} className={style.btn_icon} />
                <BsSlashLg onClick={() => { }} className={style.btn_icon} />
                <input type={'color'} className={style.btn_icon} />
            </div>

            <div className={style.btn_right}>
                <IoMdUndo onClick={() => { }} className={style.btn_icon} />
                <IoMdRedo onClick={() => { }} className={style.btn_icon} />
                <IoMdSave onClick={() => { }} className={style.btn_icon} />
            </div>
        </div>
    )
}