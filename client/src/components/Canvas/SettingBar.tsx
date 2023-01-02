import style from './SettingBar.module.scss'
import React, { ChangeEvent, FC } from 'react'
import toolState from '../../store/toolState'

export const SettingBar: FC = () => {
    const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
        toolState.setStrokeColor(e.target.value)
    }
    const changeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
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
            <label htmlFor='color'>Цвет контура</label>
            <input
                id='color'
                type={'color'}
                className={style.btn_icon}
                onChange={changeColor}
            />
        </div>
    )
}