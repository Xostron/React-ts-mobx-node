import React, { FC, MouseEvent, useState } from "react";
import style from '../style/AboutPage.module.scss'
import logo from '../assets/landing/logo.jpg'
import { SpinLogo } from "../components/UI/spin-logo/SpinLogo";




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
        <div className={style.container}>
            {/* About
            <button onClick={handlerSendObject}>SEND</button> */}

            <SpinLogo logo={logo} />

        </div>
    )
}