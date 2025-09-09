import React, { useMemo } from "react"
import css from "./matrix.module.css"
import Button from "../button/button"
import type { Cell } from "../../types/cell"
import { MatrixCell } from "./matrix-cell"
import { useMatrixContext } from "../../context/matrix-context"

type MatrixRowProps = {
    row: Cell[]
    rowIndex: number
    hoveredRowIndex: number | null
    setHoveredRowIndex: (idx: number | null) => void
    setHoveredCellId: (id: number | null) => void
    highlightedIds: number[]
}

export const MatrixRow: React.FC<MatrixRowProps> = React.memo(({
    row,
    rowIndex,
    hoveredRowIndex,
    setHoveredRowIndex,
    setHoveredCellId,
    highlightedIds
}) => {
    const { incrementCell, deleteRow } = useMatrixContext()

    const rowSum = useMemo(() => row.reduce((acc, c) => acc + c.amount, 0), [row])
    const maxInRow = useMemo(() => Math.max(...row.map(c => c.amount)), [row])
    const showPercent = hoveredRowIndex === rowIndex

    return (
        <div
            className={css.grid__container + (showPercent ? ` ${css.row__highlighted}` : "")}
            style={{ gridTemplateColumns: `150px repeat(${row.length}, minmax(60px, 1fr)) 100px 100px` }}
        >
            <div className={`${css.cell} ${css.header}`}>{rowIndex + 1}</div>

            {row.map((cell, colIndex) => {
                const value = showPercent
                    ? (rowSum === 0 ? "0%" : ((cell.amount / rowSum) * 100).toFixed(1) + "%")
                    : cell.amount

                const heatPercent = maxInRow === 0 ? 0 : (cell.amount / maxInRow) * 100
                const isHighlighted = highlightedIds.includes(cell.id)

                return (
                    <MatrixCell
                        key={cell.id}
                        value={value}
                        isHighlighted={isHighlighted}
                        heatPercent={heatPercent}
                        isRowHighlighted={showPercent}
                        onClick={() => incrementCell(rowIndex, colIndex)}
                        onMouseEnter={() => setHoveredCellId(cell.id)}
                        onMouseLeave={() => setHoveredCellId(null)}
                    />
                )
            })}

            <div
                className={`${css.cell} ${css.sum}`}
                onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                onMouseLeave={() => setHoveredRowIndex(null)}
            >
                {rowSum}
            </div>
            <div className={css.cell}>
                <Button title="Delete" variant="red" onClick={() => deleteRow(rowIndex)} />
            </div>
        </div>
    )
})
