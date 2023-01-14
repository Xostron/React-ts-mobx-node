import style from './FormPaint.module.scss'
import React, { FC, useRef } from 'react'
import { InputText } from '../../UI/input/input-text/InputText'
import { BtnText } from '../../UI/button/btn-text/BtnText'
import canvasState from '../../../store/canvas/canvasState'


export interface IFormPaint {
    setModal: (val: boolean) => void
}

export const FormPaint: FC<IFormPaint> = ({ setModal }) => {

    const refUsername = useRef<HTMLInputElement>(null)



    const connectedHandler = () => {
        canvasState.setUsername(refUsername.current?.value || '')
        if (canvasState.username !== '')
            setModal(false)
    }



    return (
        <div className={style.container}>
            <div className={style.header}>
                Введите ваше имя
            </div>
            <div className={style.content}>
                <InputText

                    props={{
                        name: '',
                        changeHandler: () => { },
                        ref: refUsername
                    }}
                />



                <BtnText color='gray' onClick={connectedHandler}>
                    Войти
                </BtnText>
            </div>
        </div>
    )
}

// управляемый Input при каждом вводе перезаписывается username
// const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     canvasState.setUsername(e.target.value)
// }
// const propsInputText: IInputText = {
//     name: 'name',
//     changeHandler: changeHandler,
// }

// неуправляемый input - считываем значение через useRef напрямую по кнопке Войти

// const ref2 = useRef<HTMLInputElement | null>(null)
//     < input ref = { ref2 } />