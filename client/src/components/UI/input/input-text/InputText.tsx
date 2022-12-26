import React, { FC } from "react";
import style from './InputText.module.scss'


export interface IInputText {
    name: string,
    placeholder?: string,
    autoFocus?: boolean,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string;
    type?: string
}
interface IPropsInputText {
    props: IInputText
}

export const InputText: FC<IPropsInputText> = ({ props }) => {
    const {
        name,
        placeholder,
        autoFocus,
        changeHandler,
        value,
        type
    } = props
    return (

        <input
            className={style.myInput}
            type={type || 'text'}
            autoComplete='off'
            autoFocus={autoFocus || false}
            placeholder={placeholder}
            name={name}
            onChange={changeHandler}
            value={value}
        />

    )
}