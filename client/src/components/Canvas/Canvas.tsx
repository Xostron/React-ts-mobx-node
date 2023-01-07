import style from './Canvas.module.scss'
import React, { FC, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import canvasState from '../../store/canvasState'
import toolState from '../../store/toolState'
import Brush from './tools/Brush'
import { MyModal } from "../../components/UI/modal/MyModal";
import { FormPaint } from "../../components/canvas/FormPaint";
import { useParams } from 'react-router-dom'
import Rect from './tools/Rect'
import Circle from './tools/Circle'
import Line from './tools/Line'
import Eraser from './tools/Eraser'
import axios from 'axios'
import { runInThisContext } from 'vm'

export const Canvas: FC = observer(() => {
    const [visible, setVisible] = useState<boolean>(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const idSession = useParams().id || ''


    useEffect(() => {
        if (canvasRef.current) {
            canvasState.setCanvas(canvasRef.current)
            axios.get(`http://localhost:5000/image?id=${idSession}`)
                .then(res => {
                    const img = new Image()
                    img.src = res.data
                    const ctx = canvasRef.current?.getContext('2d')
                    img.onload = () => {
                        if (canvasRef.current?.width) {
                            ctx?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height)
                            ctx?.drawImage(img, 0, 0, canvasRef.current?.width, canvasRef.current?.height)
                        }
                    }
                })
        }
    }, [])

    // websocket connection init
    useEffect(() => {
        if (canvasState.username) {
            // объект webSocket
            const socket = new WebSocket('ws://localhost:5000/')
            canvasState.setSocket(socket)
            canvasState.setSessionid(idSession || '')
            canvasRef.current && canvasState.socket &&
                toolState.setTool(new Brush(canvasState.canvas, canvasState.socket,
                    canvasState.sessionid, 'black', 'black', 1))
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
                let msg = JSON.parse(ev.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case 'draw':
                        handlerDraw(msg)
                        break
                }
            }
        }
    }, [canvasState.username])

    const handlerDraw = (msg: any) => {
        console.log('handlerDraw = ', msg)
        const figure = msg.figure
        const ctx = canvasRef.current?.getContext('2d')
        switch (figure.type) {
            case 'finish':
                ctx?.beginPath()
                break
            case 'brush':
                ctx && Brush.draw(ctx, figure.x, figure.y,
                    figure.fillcolor, figure.strokecolor, figure.linewidth)
                break
            case 'rect':
                ctx && Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height,
                    figure.fillcolor, figure.strokecolor, figure.linewidth)
                break
            case 'circle':
                ctx && Circle.staticDraw(ctx, figure.x, figure.y, figure.radius,
                    figure.fillcolor, figure.strokecolor, figure.linewidth)
                break
            case 'line':
                ctx && Line.staticDraw(ctx, figure.x1, figure.y1, figure.x2, figure.y2,
                    figure.fillcolor, figure.strokecolor, figure.linewidth)
                break
            case 'eraser':
                ctx && Eraser.staticDraw(ctx, figure.x, figure.y,
                    figure.fillcolor, figure.strokecolor, figure.linewidth)
                break
        }
    }

    const handlerUndo = () => {
        if (canvasRef.current)
            canvasState.pushToUndo(canvasRef.current?.toDataURL())

    }
    const handlerSaveToServer = () => {
        console.log(canvasRef.current?.toDataURL())
        axios.post(`http://localhost:5000/image?id=${idSession}`, { img: canvasRef.current?.toDataURL() })
            .then(response => console.log(response.data))
    }
    return (
        <>
            <div className={style.container}>
                <canvas
                    onMouseDown={() => { handlerUndo() }}
                    onMouseUp={() => { handlerSaveToServer() }}
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