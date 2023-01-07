import style from './SettingBar.module.scss'
import React, { ChangeEvent, FC } from 'react'
import toolState from '../../store/toolState'
import canvasState from '../../store/canvasState'

export const SettingBar: FC = () => {
    const changeStrokeColor = (e: ChangeEvent<HTMLInputElement>) => {
        // canvasState.setStrokeColor(e.target.value)
        toolState.setStrokeColor(e.target.value)
    }
    const changeFillColor = (e: ChangeEvent<HTMLInputElement>) => {
        // canvasState.setFillColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    const changeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
        // canvasState.setLineWidth(+e.target.value)
        toolState.setLineWidth(+e.target.value)
    }

    return (
        <div className={style.container}>
            <label htmlFor='line-width'>Толщина линий</label>
            <input
                id='line-width'
                type="number"
                min={1}
                max={50}
                defaultValue={1}
                onChange={changeLineWidth}
            />

            <label htmlFor='stroke-color'>Цвет контура</label>
            <input
                id='stroke-color'
                type={'color'}
                className={style.btn_icon}
                onChange={changeStrokeColor}
            />

            <label htmlFor='fill-color'>Цвет заливки</label>
            <input
                id='fill-color'
                type={'color'}
                className={style.btn_icon}
                onChange={changeFillColor}
            />
        </div>
    )
}