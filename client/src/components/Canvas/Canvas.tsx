import style from './Canvas.module.scss'
import React, { FC, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../../store/canvasState'
import toolState from '../../store/toolState'
import Brush from './tools/Brush'

export const Canvas: FC = observer(() => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        if (canvasRef.current) {
            console.log(canvasRef.current)
            canvasState.setCanvas(canvasRef.current)
            toolState.setTool(new Brush(canvasRef.current))
        }
    }, [])

    return (
        <div className={style.container}>
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    )
})