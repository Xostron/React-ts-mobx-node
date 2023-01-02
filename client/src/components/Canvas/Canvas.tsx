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
            canvasState.setCanvas(canvasRef.current)
            toolState.setTool(new Brush(canvasRef.current))
        }
    }, [])

    const handlerUndo = () => {
        if (canvasRef.current)
            canvasState.pushToUndo(canvasRef.current?.toDataURL())
    }

    return (
        <div className={style.container}>
            <canvas onMouseDown={() => { handlerUndo() }} ref={canvasRef} width={800} height={400} />
        </div>
    )
})