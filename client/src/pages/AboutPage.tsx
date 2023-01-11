import React, { FC, MouseEvent, useState, useEffect } from "react";
import style from '../style/AboutPage.module.scss'
import logo from '../assets/landing/logo.jpg'
import { SpinLogo } from "../components/UI/spin-logo/SpinLogo";


let chislo = 8
let massivChisel = [1, 2, 3, 4, 5, 6, 7, 8]
let result = [[2, 3], [4, 1]]

const AboutPage: FC = () => {

    function combiSum(ori: number[], target: number) {
        let result: any[] = []
        let combinationArr: any[] = []
        let combination = Math.pow(2, ori.length)
        for (let i = 1; i < combination; i++) {
            let binary = i.toString(2).split('')
            let binaryArr = [...new Array((ori.length - binary.length)), ...binary].reverse()
            combinationArr.push([...binaryArr])
        }
        // console.log(combinationArr)
        for (let item of combinationArr) {
            let summator: number[] = []
            item.forEach((element: any, idx: number) => {
                if (element === '1') {
                    summator.push(ori[idx])
                }
                else { }
            });
            let summ = summator.reduce((sum, val) => sum + val, 0)
            if (summ === target) {
                result.push([...summator])
            }
        }
        return result
    }


    // let massivChisel2: number[] = massivChisel.sort()
    console.log('ARR=', massivChisel, chislo)
    let arr4: any[] = combiSum(massivChisel, chislo)
    // let arr3: any[] = combi(massivChisel2, chislo, [], [], 0, 0, 0)
    console.log('RESULT=', arr4)



    return (
        <div className={style.container}>



        </div>
    )
}

export default AboutPage




// Рабочий
// function sostavChisla(massivChisel, chislo) {
// 	// код писать только внутри данной функции
//   function combiSum(ori, target) {
//     let result: any[] = []
//     let combinationArr: any[] = []
//     let combination = Math.pow(2, ori.length)
//     for (let i = 1; i < combination; i++) {
//       let binary = i.toString(2).split('')
//       let binaryArr = [...new Array((ori.length - binary.length)), ...binary].reverse()
//         combinationArr.push([...binaryArr])
//         }
//         // console.log(combinationArr)
//     for (let item of combinationArr) {
//       let summator: number[] = []
//       item.forEach((element: any, idx: number) => {
//         if (element === '1') {
//           summator.push(ori[idx])
//         }
//         else { }
//         });
//         let summ = summator.reduce((sum, val) => sum + val, 0)
//         if (summ === target) {
//           result.push([...summator])
//         }
//      }
//         return result
//     }
//   result = combiSum(massivChisel,chislo)
//   return result
// }



//  эксперименты

// function fact(x: number) {
//     if (x <= 1) return 1
//     const y: number = x * fact(x - 1)
//     return y
// }

// // console.log('factorial =', fact(3))
// // ****************************************************************************************
// function combi1(ori: number[], target: number, result: number[], idx: number) {
//     if (idx > ori.length - 1) {
//         result.push(idx)
//         return result
//     }
//     result.push(idx)
//     let x = idx + 1
//     combi1(ori, target, result, x)
//     return result
// }

// // let arr2: number[] = combi1(massivChisel, chislo, [], 0)
// // console.log('qwerty=', massivChisel)


// // ****************************************************************************************

// function combi(ori: number[], target: number, result: any[], summator: any[], idx: number, idx2: number, idx3: number) {
//     // console.log(idx)
//     let way = '='
//     // ===========выход из рекурсии===========
//     if (idx3 > ori.length - 2) {
//         return result
//     }

//     // ===========промежуточные вычисления===========
//     if (idx === idx2) {
//         summator.push(ori[idx])
//     }
//     else {
//         summator.push(ori[idx2])
//     }

//     let summ = summator.reduce((sum, val) => sum + val, 0)
//     let x = idx
//     let x2 = idx2
//     let x3 = idx3
//     console.log('summator = ', summator)
//     // console.log('result = ', result)
//     if (summ === target) {
//         let str: string = summator.join('')
//         let resStr: string[] = result.map(val => val.join(''))

//         if (!resStr.includes(str)) result.push([...summator])

//         console.log('match =', summator, result)
//         summator.pop()
//         x2 = idx2 + 1

//     }
//     else if (summ > target) {
//         if (summator.length > 2) {
//             summator.pop()
//             summator.pop()
//             x2 = idx2 + 1
//         }
//         else {
//             summator.pop()
//             x2 = idx2 + 2
//         }
//         // summator.length = x3
//         x2 = idx2 + 1
//         way = '>'
//     }
//     else if (summ < target) {
//         x2 = idx2 + 1
//         way = '<'
//     }
//     // ===========вызов рекурсии===========
//     console.log('х =', x, x2, x3)
//     if (x2 > ori.length - 1) {
//         x = idx + 1
//         x2 = x
//         if (x > ori.length - 2) {
//             x3 = idx3 + 1
//             x = x3
//             x2 = x
//         }
//     }


//     combi(ori, target, result, summator, x, x2, x3)

//     // ===========результат===========
//     return result
// }


// function newCombi(ori: number[], target: number) {
//     let result: number[] = []
//     let summator: number[] = []
//     let x1: number = -1
//     let x2: number = 0
//     let x3: number = 0
//     while (x1 < ori.length) {
//         // summator.length = x1
//         console.log('level = ', x1)

//         if (x1 === -1) {
//             for (let i = 0; i < ori.length; i++) {
//                 summator.push(ori[i])
//                 console.log('summator if= ', summator)
//                 summator.length = 0
//             }
//         }
//         else if (x1 === 0) {
//             for (let i = x1; i < ori.length - 1; i++) {
//                 summator.length = x1

//                 summator.push(ori[i])

//                 for (let j = i + 1; j < ori.length; j++) {
//                     summator.push(ori[j])
//                     console.log('summator = ', summator)
//                     summator.pop()
//                 }
//             }
//         }
//         else if (x1 === ori.length) {
//             summator = ori
//             console.log('summator = ', summator)
//         }
//         else if (x1 >= 1) {
//             for (let i = x1; i < ori.length; i++) {
//                 summator = ori.slice(x1 - 1, x1)

//                 summator.push(ori[i])

//                 for (let j = i + 1; j < ori.length; j++) {
//                     summator.push(ori[j])
//                     console.log('summator = ', summator)
//                     summator.pop()
//                 }
//             }
//         }


//         x1++

//     }
//     return result
// }