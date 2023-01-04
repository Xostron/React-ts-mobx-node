import style from './Canvas.module.scss'
import React, { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../../store/canvasState'
import toolState from '../../store/toolState'
import Brush from './tools/Brush'
import { MyModal } from "../../components/UI/modal/MyModal";
import { FormPaint } from "../../components/canvas/FormPaint";
import { useParams } from 'react-router-dom'

export const Canvas: FC = observer(() => {
    const [visible, setVisible] = useState<boolean>(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const idSession = useParams().id
    // console.log('id', idSession)

    useEffect(() => {
        if (canvasRef.current) {
            canvasState.setCanvas(canvasRef.current)
            toolState.setTool(new Brush(canvasRef.current))
        }
    }, [])

    // websocket connection init
    useEffect(() => {
        if (canvasState.username) {
            // объект webSocket
            const socket = new WebSocket('ws://localhost:5000/')
            // установка соединения - слушатель onopen
            socket.onopen = () => {
                // передаем на сервер
                socket.send(JSON.stringify({
                    id: idSession,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }
            // читаем от сервера
            socket.onmessage = (ev: MessageEvent<any>) => {
                console.log('from server: ', ev.data)
            }
        }
    }, [canvasState.username])

    const handlerUndo = () => {
        if (canvasRef.current)
            canvasState.pushToUndo(canvasRef.current?.toDataURL())
    }

    return (
        <>
            <div className={style.container}>
                <canvas
                    onMouseDown={() => { handlerUndo() }}
                    ref={canvasRef}
                    width={800}
                    height={400}
                />
            </div>

            <MyModal visible={visible} setVisible={() => { }}>
                <FormPaint setModal={setVisible} />
            </MyModal>
        </>
    )
})