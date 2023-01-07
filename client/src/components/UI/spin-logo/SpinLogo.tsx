import React, { FC, useState } from 'react'
import style from './SpinLogo.module.scss'

export interface ISpinLogo {
    logo: string
}

export const SpinLogo: FC<ISpinLogo> = ({ logo }) => {

    const [spinOn, setSpinOn] = useState<boolean>(false)
    const styleLogo = [style.logo]
    if (spinOn) {
        styleLogo.push(style.spin)

    }
    return (
        <div className={styleLogo.join(' ')} onClick={() => setSpinOn(!spinOn)}>
            <img className={style.img} src={logo} />
        </div>
    )
}