import React, { FC, MouseEvent } from "react";

export default function AboutPage() {
    const socket = new WebSocket('ws://localhost:5000/')
    socket.onopen = () => {
        socket.send(JSON.stringify({
            id: '100',
            method: 'connection',
            username: 'xostron',
        }))
    }
    socket.onmessage = (ev: MessageEvent<any>) => {
        console.log('from server: ', ev.data)
    }
    const handlerSend = (e: MouseEvent<HTMLButtonElement>) => {
        socket.send('client: кнопка нажата')
    }
    const handlerSendObject = (e: MouseEvent<HTMLButtonElement>) => {
        socket.send(JSON.stringify({
            id: '100',
            method: 'message',
            username: 'xostron',
            message: 'Hello'
        }))
    }
    return (
        <div style={{ paddingTop: '100px' }}>
            About
            <button onClick={handlerSendObject}>SEND</button>
        </div>
    )
}