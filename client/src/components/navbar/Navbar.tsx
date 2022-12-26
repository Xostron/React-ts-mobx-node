import React, { useState, FC } from "react";
import { ILink, LinkIcon } from "../UI/link/link-icon/LinkIcon";
import style from './Navbar.module.scss'

import { FiChevronUp, FiGitlab, FiX, FiMenu } from 'react-icons/fi'


export const Navbar: FC = () => {

    const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
    const styleMenu = [style.links]
    if (visibleMenu) styleMenu.push(style.visible)

    const handlerVisibleMenu = (e: React.MouseEvent<SVGAElement>) => {
        setVisibleMenu(!visibleMenu)
    }

    const links: ILink[] = [
        { name: 'Story', to: '/', disabled: false },
        { name: 'About', to: '/about', disabled: false }
    ]

    return (
        <div className={style.container}>

            <h2>Xostron</h2>

            <div className={styleMenu.join(' ')}>
                {links.map((link, idx) => <LinkIcon
                    key={idx}
                    item={link}
                />
                )}
            </div>

            {visibleMenu ?
                <FiX size={25} onClick={handlerVisibleMenu} className={style.iconMenu} />
                :
                <FiMenu size={25} onClick={handlerVisibleMenu} className={style.iconMenu} />
            }

        </div>
    )
}