import React, { lazy } from "react";



const MainPage = lazy(() => import('../pages/landing/MainPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const PaintPage = lazy(() => import('../pages/canvas/PaintPage'))

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
        path: '/paint/:id',
    }
]
export default pages

