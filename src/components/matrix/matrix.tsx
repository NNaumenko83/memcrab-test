import React, { useEffect, useState } from "react"
import { useMatrixContext } from "../../context/matrix-context"
import css from "./matrix.module.css"
import Container from "../container/container"
import Button from "../button/button"
import { calculatePercentile } from "../../utils/calculate-percentile"

const Matrix: React.FC = () => {
    const {
        matrix,
        incrementCell,
        deleteRow,
        rowsQuantity,
        columnsQuantity
    } = useMatrixContext()
    const [hoveredCellId, setHoveredCellId] = useState<number | null>(null)
    const [highlightedIds, setHighlightedIds] = useState<number[]>([])
    console.log('matrix:', matrix)

    const totalCells = rowsQuantity * columnsQuantity
    const nearestCount = Math.max(2, Math.ceil(totalCells * 0.2))

    useEffect(() => {
        if (hoveredCellId === null) {
            setHighlightedIds([])
            return
        }
        const allCells = matrix.flat()
        const hoveredCell = allCells.find(c => c.id === hoveredCellId)
        if (!hoveredCell) return
        const sortedByDistance = [...allCells].sort(
            (a, b) => Math.abs(a.amount - hoveredCell.amount) - Math.abs(b.amount - hoveredCell.amount)
        )
        setHighlightedIds(sortedByDistance.slice(0, nearestCount).map(c => c.id))
    }, [matrix, hoveredCellId, nearestCount])

    const rowSums = matrix.map(row => row.reduce((acc, c) => acc + c.amount, 0))
    const colPercentiles = Array.from({ length: columnsQuantity }, (_, colIndex) =>
        calculatePercentile(matrix.map(row => row[colIndex]?.amount ?? 0), 60)
    )

    if (matrix.length === 0)
        return <Container><p>Please set rows and columns to generate the matrix.</p></Container>

    return (
        <Container>
            <div
                className={css.grid__container}
                style={{ gridTemplateColumns: `150px repeat(${columnsQuantity + 1}, minmax(60px, 1fr)) 100px` }}
            >
                <div className={`${css.cell} ${css.header}`} />
                {Array.from({ length: columnsQuantity }, (_, i) => (
                    <div key={i} className={`${css.cell} ${css.header}`}>{i + 1}</div>
                ))}
                <div className={`${css.cell} ${css.header}`}>SUM</div>
                <div className={`${css.cell} ${css.header}`} />
            </div>

            {matrix.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className={css.grid__container}
                    style={{ gridTemplateColumns: `150px repeat(${columnsQuantity + 1}, minmax(60px, 1fr)) 100px` }}
                >
                    <div className={`${css.cell} ${css.header}`}>{rowIndex + 1}</div>
                    {row.map((cell, colIndex) => (
                        <div
                            key={cell.id}
                            className={`${css.cell} ${highlightedIds.includes(cell.id) ? css.highlighted : ""}`}
                            onClick={() => incrementCell(rowIndex, colIndex)}
                            onMouseEnter={() => setHoveredCellId(cell.id)}
                            onMouseLeave={() => setHoveredCellId(null)}
                        >
                            {cell.amount}
                        </div>
                    ))}
                    <div className={`${css.cell} ${css.sum}`}>{rowSums[rowIndex]}</div>
                    <div className={css.cell}>
                        <Button title="Delete" variant="red" onClick={() => deleteRow(rowIndex)} />
                    </div>
                </div>
            ))}

            <div
                className={css.grid__container}
                style={{ gridTemplateColumns: `150px repeat(${columnsQuantity + 1}, minmax(60px, 1fr)) 100px` }}
            >
                <div className={`${css.cell} ${css.header}`}>60th percentile</div>
                {colPercentiles.map((val, i) => (
                    <div key={i} className={`${css.cell} ${css.percentile}`}>{val}</div>
                ))}

            </div>
        </Container>
    )
}

export default Matrix
