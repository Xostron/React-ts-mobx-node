import React, { FC } from "react";
import { Hero } from "../components/Hero/Hero";
import style from '../style/MainPage.module.scss'
import iHero from '../assets/logo.jpg'
import i1 from '../assets/1.jpg'
import i2 from '../assets/2.jpg'
import i3 from '../assets/3.jpg'
import i4 from '../assets/4.png'
import i5 from '../assets/5.jpg'
import i6 from '../assets/6.jpg'
import i7 from '../assets/7.jpg'
import i8 from '../assets/8.jpg'
import i9 from '../assets/10.jpg'
import { ItemImg } from "../components/item-img/ItemImg";




export default function MainPage<FC>() {

    return (
        <div className={style.container}>
            <Hero img={iHero} />
            <ItemImg img={i1} title='Boy!' subtitle='Kratos' flipped={false} />
            <ItemImg img={i2} title='I caught a deer' subtitle='Kratos & Atreus' flipped={true} />
            <ItemImg img={i4} title='Hrrr...' subtitle='Gharm' flipped={false} />
            <ItemImg img={i5} title='Yggdrasil' subtitle='Ratatosk' flipped={true} />
            <ItemImg img={i6} title='Brok & Sindri' subtitle='Huldra Brothers' flipped={false} />
            <ItemImg img={i7} title='Are you from Odin?' subtitle='Tyr & Atreus' flipped={true} />
            <ItemImg img={i8} title='Be better!' subtitle='Kratos and Atreus' flipped={false} />
            <ItemImg img={i3} title='Close your heart' subtitle='Old Kratos' flipped={true} />
            <ItemImg img={i9} title='Open your heart, son' subtitle='Kratos' flipped={false} />

        </div>
    )
}