import React from 'react'
import css from './button.module.css'

type Props = {
    title: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
}

const Button = ({ title, onClick, type = "button", disabled }: Props) => {
    return (
        <button className={css.button} onClick={onClick} type={type} disabled={disabled}>
            {title}
        </button>
    )
}

export default Button