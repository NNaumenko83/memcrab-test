import React from "react"
import css from "./matrix.module.css"

type MatrixCellProps = {
    value: number | string
    isHighlighted?: boolean
    isRowHighlighted?: boolean
    heatPercent?: number
    onClick?: () => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

export const MatrixCell: React.FC<MatrixCellProps> = React.memo(({
    value,
    isHighlighted = false,
    isRowHighlighted = false,
    heatPercent = 0,
    onClick,
    onMouseEnter,
    onMouseLeave
}) => {

    console.log('heatPercent:', heatPercent)
    const classes = [css.cell]
    if (isHighlighted) classes.push(css.highlighted)
    if (isRowHighlighted) classes.push(css.row__highlighted)


    const style = isRowHighlighted
        ? {
            backgroundColor: `rgba(255, 165, 0, ${heatPercent / 100})`
        }
        : undefined

    return (
        <div
            className={classes.join(" ")}
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {value}
        </div>
    )
})
