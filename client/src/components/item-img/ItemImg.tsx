import style from './ItemImg.module.scss'
import React, { FC } from 'react'
import { useInView } from 'react-intersection-observer';

interface IPropsItemImg {
    img: string;
    title: string;
    subtitle: string;
    flipped: boolean;
}


export const ItemImg: FC<IPropsItemImg> = ({ img, title, subtitle, flipped }) => {
    const { ref, inView } = useInView({
        threshold: 0.4,
    })
    const renderItem = () => {
        if (!flipped) {
            return (
                <>
                    <img src={img} alt='photo' className={style.image} />
                    <div className={style.content}>
                        <h1 className="title">{title}</h1>
                        <p>{subtitle}</p>
                    </div>

                </>
            )
        }
        else {
            return (
                <>
                    <div className={style.content}>
                        <h1 className="title">{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                    <img src={img} alt='photo' className={style.image} />
                </>
            )
        }
    }
    return (
        <div className={inView ? style.container + ' ' + style.zoom : style.container} ref={ref}>
            {renderItem()}
        </div>
    )
}