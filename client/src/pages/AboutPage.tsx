import React, { FC, MouseEvent, useState, useEffect } from "react";
import { SliderClassic } from "../components/UI/slider/Slider-classic";
import style from '../style/AboutPage.module.scss'




const AboutPage: FC = () => {




    return (
        <div className={style.container}>

            <SliderClassic>
                <div className={style.item} style={{ backgroundColor: 'green' }}>Item 1</div>
                <div className={style.item} style={{ backgroundColor: 'yellow' }}>Item 2</div>
                <div className={style.item} style={{ backgroundColor: 'blue' }}>Item 3</div>
            </SliderClassic>

        </div>
    )
}

export default AboutPage





