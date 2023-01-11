import React, { FC, useState, useEffect } from "react";
import { IGitUser } from "../../../types/typesGithub";


export interface IPGithubUser {
    user: string
}
// выгрузить из local storage
const getLocalStorage = (key: string) => {
    if (key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '')
        } catch (error) {
            return null
        }
    }
}
// загрузить из local storage
const setLocalStorage = (key: string, data: IGitUser) => {
    localStorage.setItem(key, JSON.stringify(data))
}


export const GithubUser: FC<IPGithubUser> = ({ user }) => {
    // init from localStorage
    const [data, setData] = useState<IGitUser>({} as IGitUser)
    const [error, setError] = useState<ErrorEvent>()
    const [loading, setLoading] = useState<boolean>(false)

    // get запрос
    const getUserGit1 = (user: string) => {
        setLoading(true)
        fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(data => setData(data))
            .then(() => { setLoading(false) })
            // .then(() => { throw new Error('тяу тяу тяу тяу') })
            .catch(e => setError(e))
    }

    const getUserGit2 = async (user: string) => {
        setLoading(true)
        try {
            const res = await fetch(`https://api.github.com/users/${user}`)
            const data = await res.json()
            setData(data)
            setLoading(false)
            // throw new Error('тяу тяу тяу тяу')
        } catch (e: any) {
            setError(e)
            setLoading(false)
        }


    }
    useEffect(() => {
        getUserGit2(user)
    }, [])


    return (
        <>
            {loading && <>Loading...</>}
            {error && <>Error...{error.message}</>}
            <>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <img width={150} src={data.avatar_url} alt="" />
            </>

        </>
    )
}



/*
Использование localStorage:
1) данные инициализируются из хранилища в стейт
2) первый Эффект проверяет наличие данных в стейте - если их нет,
то обновление хранилища не выполняется.
3) второй эффект проверяет данные в хранилище - если их там нет,
отправляет запрос на сервер и записывает результат в стейт
4) снова срабатывает первый эффект, по изменению зависимости:
Данные в стейте имеются (результат запроса на сервер), проверяет соответсвие стейта с
хранилищем: не равно - записываем в хранилище, иначе - нет

теперь данные в хранилище имеются и при перезагрузке страницы второй
эффект не будет отправлять запрос на сервер

это плохой паттерн работы с хранилищем, просто показывает работу web API
*/
// const [data, setData] = useState<IGitUser>(getLocalStorage(`user:${user}`))
    // проверка актуальности данных в хранилище и его обновление, если не актуально
    // useEffect(() => {

    //     console.log('localStorage', data)
    //     if (!data) {
    //         console.log('1')
    //         return
    //     }

    //     const dataLocalStorage = getLocalStorage(`user:${user}`)
    //     if (dataLocalStorage && dataLocalStorage.login.toLocaleLowerCase() === user) {
    //         console.log('2')
    //         return
    //     }
    //     console.log('3')
    //     const { login, html_url, avatar_url } = data
    //     setLocalStorage(`user:${user}`, {
    //         login, html_url, avatar_url
    //     })
    // }, [data])

    // // запрос данных о пользователе если данные в хранилище не совпадают
    // useEffect(() => {
    //     if (!user) return
    //     const dataLocalStorage = getLocalStorage(`user:${user}`)
    //     if (dataLocalStorage && dataLocalStorage.login.toLocaleLowerCase() === user) {
    //         console.log('4')
    //         return
    //     }
    //     console.log('5')
    //     getUserGit()
    // }, [])