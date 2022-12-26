import React, { useState, FC } from 'react'
import style from './DropdownV1.module.scss'
import { HandySvg } from 'handy-svg'
import iArrow from '../../../source/icons/bxs-down-arrow.svg'


interface IDropdownV1 {
    options: any[];
    value: string;
    onChange?: (option: any) => void
}

// Выпадающий список
export const DropdownV1: FC<IDropdownV1> = ({ options, value, onChange }) => {
    // видимость выпадающего списка
    const [active, setActive] = useState<boolean>(false)

    // стили - видимость списка
    const styleContent = [style.content]
    const styleIcon = [style.icon]
    if (active) {
        styleContent.push(style.activeContent)
        styleIcon.push(style.activeIcon)
    }

    return (

        <div className={style.dropdown}>
            {/* видимая часть селектора */}
            <div className={style.default}
                onClick={() => setActive(!active)}
            >
                <span className={style.name}>{value}</span>
                <span style={{ width: '16px' }}></span>
                <HandySvg className={styleIcon.join(' ')} src={iArrow} />
            </div>

            {/* выпадающий список*/}
            {<div className={styleContent.join(' ')}>
                {
                    options.filter((val) => val !== value).map((option, idx) =>
                        <div className={style.item}
                            key={idx}
                            onClick={() => {
                                setActive(!active)
                                onChange?.(option)
                            }}
                        >
                            {option}
                        </div>
                    )
                }
            </div>}
        </div>

    )
}