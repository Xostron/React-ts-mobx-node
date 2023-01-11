import React, { FC, MouseEvent, useState, useEffect } from "react";
import style from '../style/AboutPage.module.scss'
import logo from '../assets/landing/logo.jpg'
import { SpinLogo } from "../components/UI/spin-logo/SpinLogo";


let chislo = 5
let massivChisel = [8, 2, 3, 4, 5, 6, 7, 1]
let result = [[2, 3], [4, 1]]

const AboutPage: FC = () => {

    function fact(x: number) {
        if (x <= 1) return 1
        const y: number = x * fact(x - 1)
        return y
    }

    console.log('factorial =', fact(3))
    // ****************************************************************************************
    function combi1(ori: number[], target: number, result: number[], idx: number) {
        if (idx > ori.length - 1) {
            result.push(idx)
            return result
        }
        result.push(idx)
        let x = idx + 1
        combi1(ori, target, result, x)
        return result
    }

    let arr2: number[] = combi1(massivChisel, chislo, [], 0)
    console.log('qwerty=', massivChisel)


    // ****************************************************************************************

    function combi(ori: number[], target: number, result: any[], summator: any[], idx: number, idx2: number, idx3: number) {
        // console.log(idx)
        let way = '='
        // ===========выход из рекурсии===========
        if (idx3 > ori.length - 2) {
            return result
        }

        // ===========промежуточные вычисления===========
        if (idx === idx2) {
            summator.push(ori[idx])
        }
        else {
            summator.push(ori[idx2])
        }

        let summ = summator.reduce((sum, val) => sum + val, 0)
        let x = idx
        let x2 = idx2
        let x3 = idx3
        console.log('summator = ', summator)
        // console.log('result = ', result)
        if (summ === target) {
            let str: string = summator.join('')
            let resStr: string[] = result.map(val => val.join(''))

            if (!resStr.includes(str)) result.push([...summator])

            console.log('match =', summator, result)
            summator.pop()
            x2 = idx2 + 1

        }
        else if (summ > target) {
            if (summator.length > 2) {
                summator.pop()
                summator.pop()
                x2 = idx2 + 1
            }
            else {
                summator.pop()
                x2 = idx2 + 2
            }
            // summator.length = x3
            x2 = idx2 + 1
            way = '>'
        }
        else if (summ < target) {
            x2 = idx2 + 1
            way = '<'
        }
        // ===========вызов рекурсии===========
        console.log('х =', x, x2, x3)
        if (x2 > ori.length - 1) {
            x = idx + 1
            x2 = x
            if (x > ori.length - 2) {
                x3 = idx3 + 1
                x = x3
                x2 = x
            }
        }


        combi(ori, target, result, summator, x, x2, x3)

        // ===========результат===========
        return result
    }


    function newCombi(ori: number[], target: number) {
        let result: number[] = []
        let x1: number = 0
        let x2: number = 0
        let x3: number = 0
        while (x1 < ori.length) {
            x1++
        }
        return result
    }

    let massivChisel2: number[] = massivChisel.sort()
    console.log('ARR=', massivChisel2)
    let arr4: any[] = newCombi(massivChisel2, chislo)
    // let arr3: any[] = combi(massivChisel2, chislo, [], [], 0, 0, 0)
    console.log('RESULT=', arr4)



    return (
        <div className={style.container}>



        </div>
    )
}

export default AboutPage