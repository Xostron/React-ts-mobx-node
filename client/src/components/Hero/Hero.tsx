import style from './Hero.module.scss'
import React, { FC } from 'react'

interface IHero {
    img: string
}

export const Hero: FC<IHero> = ({ img }) => {

    return (
        <div className={style.container}>
            <img src={img} alt="logo" className={style.image} />
            <h1 className={style.title}>
                {/* God of war: Ragnarok */}
            </h1>
        </div>
    )
}