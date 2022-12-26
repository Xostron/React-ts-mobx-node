import style from './Canvas.module.scss'
import React, { FC } from 'react'

export const Canvas: FC = () => {
    return (
        <div className={style.container}>
            <canvas width={600} height={400} />
        </div>
    )
}