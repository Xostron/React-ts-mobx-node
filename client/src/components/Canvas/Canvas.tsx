import style from './Canvas.module.scss'
import React, { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../../store/canvasState'

export const Canvas: FC = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {

        // console.log(canvasRef.current)
        canvasState.setCanvas(canvasRef.current)
    }, [])
    return (
        <div className={style.container}>
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    )
})