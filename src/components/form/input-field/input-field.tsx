import React from "react"
import css from "./input-field.module.css"

interface InputFieldProps {
    id: string
    label: string
    value: number | undefined
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, min = 0, max = 100, step = 1 }) => {
    return (
        <div className={css.input__wrapper}>
            <label htmlFor={id}>{label}:</label>
            <input
                type="number"
                id={id}
                name={id}
                value={value ?? ""}
                onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
                min={min}
                max={max}
                step={step}
            />
        </div>
    )
}

export default InputField
