import React, { FC, MouseEvent, useState, useEffect } from "react";
import style from '../style/AboutPage.module.scss'
import logo from '../assets/landing/logo.jpg'
import { SpinLogo } from "../components/UI/spin-logo/SpinLogo";




const AboutPage: FC = () => {

    const [thenData, setThenData] = useState()
    const [awaitData, setAwaitData] = useState()
    const [avatar, setAvatar] = useState()
    // get запрос
    const getUserGit = async () => {
        try {
            const response = await fetch('https://api.github.com/users/xostron')
            const data = await response.json()
            setAwaitData(data)
        } catch (e) {
            console.error(e)
        }
    }
    // post запрос 
    // JSON.stringify - преобразует объект в json строку
    const postData = async (username: string, id: string, bio: string) => {
        await fetch('url', {
            method: 'POST',
            body: JSON.stringify({ username, id, bio })
        })
    }

    // post запрос файлов - Объекты FormData всегда отсылаются с заголовком 
    // Content-Type: multipart/form-data, этот способ 
    // кодировки позволяет отсылать файлы.
    const postFile = async () => {
        const formData = new FormData()
        formData.append('username', 'xostron')
        formData.append('bio', 'frontend-developer')
        formData.append('avatar', logo, 'avatar.jpg')
        await fetch('url', {
            method: 'POST',
            body: formData
        })
    }


    // запрос данных о пользователе
    useEffect(() => {
        // связывание функций .then запросом
        fetch('https://api.github.com/users/xostron')
            .then(response => response.json())
            .then(result => {
                setThenData(result)
            })
            .catch(console.error)

        // функция async-await
        getUserGit()
    }, [])

    useEffect(() => {
        console.log('thenData=', thenData)
        console.log('awaitData = ', awaitData)


    }, [awaitData])

    return (
        <div className={style.container}>

            <pre>{JSON.stringify(awaitData, null, 2)}</pre>

        </div>
    )
}

export default AboutPage