import React, { lazy } from "react";



const MainPage = lazy(() => import('../pages/MainPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const PaintPage = lazy(() => import('../pages/PaintPage'))

const pages = [
    {
        Element: MainPage,
        path: '/'
    },
    {
        Element: AboutPage,
        path: '/about',
    },
    {
        Element: PaintPage,
        path: '/paint',
    }
]
export default pages

