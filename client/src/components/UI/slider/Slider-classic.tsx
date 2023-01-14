import React, { useState, useEffect, FC, useRef, Children, cloneElement } from "react";
import style from './Slider-classic.module.scss'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IconType } from "react-icons";
import { ItemImg } from "../../landing/item-img/ItemImg";

interface IPropsSliderCl {
    children: React.ReactNode | React.ReactNode[]
}


export const SliderClassic: FC<IPropsSliderCl> = ({ children }) => {
    const refContainer: React.LegacyRef<HTMLDivElement> = useRef(null)
    const refChildren: React.LegacyRef<HTMLDivElement> = useRef(null)
    // текущий слайд
    const [current, setCurrent] = useState<number>(1)
    // антидребезг
    const [loading, setLoading] = useState<boolean>(false)
    // массив дочерних элементов
    const [item, setItem] = useState<React.ReactElement[]>([])
    useEffect(() => {
        // преобразуем коллекцию-псевдомассив children в массив
        let arr: any = Children.toArray(children)
        setItem(arr)
    }, [])

    // ширина контейнера
    // 1 способ querySelector
    // let OFFSET_WIDTH = - (document.querySelector(`.${style.container}`)?.clientWidth || 0)
    // 2 способ useRef
    let OFFSET_WIDTH = - (refContainer.current?.clientWidth || 0)
    // назад
    const backHandler = () => {
        setLoading(true)
        !loading &&
            setCurrent((current) => {
                let pos = 0
                if (current > 0) {
                    // 1 способ querySelector
                    // let refChildren1 = document.querySelector<HTMLElement>(`.${style.children}`)
                    // if (refChildren1) refChildren1.style.transitionDuration = '.5s';
                    // 2 способ useRef
                    if (refChildren.current) { refChildren.current.style.transitionDuration = '.5s' }
                    pos = current - 1
                }
                else {
                    pos = Children.count(children) - 1
                }
                // console.log(pos)
                return pos
            })
    }
    // вперед
    const forwardHandler = () => {
        setLoading(true)
        !loading &&
            setCurrent((current) => {
                let pos = 0
                if (current <= Children.count(children)) {
                    // let refChildren = document.querySelector<HTMLElement>(`.${style.children}`)
                    // if (refChildren) refChildren.style.transitionDuration = '.5s';
                    if (refChildren.current) { refChildren.current.style.transitionDuration = '.5s' }
                    pos = current + 1
                }
                else {
                    pos = 0
                }
                // console.log(pos)
                return pos
            })

    }
    // бечконечный слайдер
    useEffect(() => {
        const transitionEnd = () => {
            setLoading(false)
            if (current < 1) {
                console.log(current)
                // let refChildren = document.querySelector<HTMLElement>(`.${style.children}`)
                // if (refChildren) refChildren.style.transitionDuration = '0s';
                if (refChildren.current) { refChildren.current.style.transitionDuration = '.0s' }
                setCurrent(item.length)
            }
            if (current > Children.count(children)) {
                console.log(current)
                // let refChildren = document.querySelector<HTMLElement>(`.${style.children}`)
                // if (refChildren) refChildren.style.transitionDuration = '0s';
                if (refChildren.current) { refChildren.current.style.transitionDuration = '.0s' }
                setCurrent(1)
            }
        }
        document.addEventListener('transitionend', transitionEnd)

        return () => {
            document.removeEventListener('transitionend', transitionEnd)
        }
    }, [current, children])

    return (
        <div className={style.wrapper}>
            <IoIosArrowBack
                className={style.arrow}
                onClick={backHandler}
            />
            <div className={style.container} ref={refContainer}>
                <div
                    ref={refChildren}
                    id="slider-item"
                    className={style.children}
                    style={{ transform: `translateX(${OFFSET_WIDTH * current}px)` }}
                >
                    {item[item.length - 1]}

                    {item}
                    {item[0]}
                </div>
            </div>
            <IoIosArrowForward
                width={'32px'}
                className={style.arrow}
                onClick={forwardHandler}
            />
        </div>
    )
}