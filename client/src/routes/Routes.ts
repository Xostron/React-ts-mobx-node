import React, { lazy } from "react";

const MainPage = lazy(() => import('../pages/MainPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))

const pages = [
    {
        Element: MainPage,
        path: '/'
    },
    {
        Element: AboutPage,
        path: '/about',
    },
]
export default pages

