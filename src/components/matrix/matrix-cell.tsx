import React from "react"
import css from "./matrix.module.css"

type MatrixCellProps = {
    value: number | string
    isHighlighted: boolean
    isRowHighlighted: boolean
    onClick: () => void
    onMouseEnter: () => void
    onMouseLeave: () => void
}

export const MatrixCell: React.FC<MatrixCellProps> = React.memo(({
    value,
    isHighlighted,
    isRowHighlighted,
    onClick,
    onMouseEnter,
    onMouseLeave
}) => {
    const classes = [css.cell]
    if (isHighlighted) classes.push(css.highlighted)
    if (isRowHighlighted) classes.push(css.row__highlighted)


    return (
        <div
            className={classes.join(" ")}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {value}
        </div>
    )
})
