import css from './button.module.css'

type Props = {
    title: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    variant?: "blue" | "green" | "red";
}

const Button = ({ title, onClick, type = "button", disabled, variant = "blue" }: Props) => {
    return (
        <button
            className={`${css.button} ${css[variant]}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {title}
        </button>
    )
}

export default Button
