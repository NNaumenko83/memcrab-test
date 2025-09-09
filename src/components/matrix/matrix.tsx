import React, { useEffect, useState } from "react"
import useTableContext from "../../context/matrix-context"
import type { Cell } from "../../types/cell"
import css from "./matrix.module.css"
import Container from "../container/container"
import { calculatePercentile } from "../../utils/calculate-percentile"
import { getRandomAmount } from "../../utils/get-random-amount"

const Matrix: React.FC = () => {
    const { rowsQuantity, columnsQuantity } = useTableContext()
    const [matrix, setMatrix] = useState<Cell[][]>([])
    const [highlightedIds, setHighlightedIds] = useState<number[]>([])
    const [hoveredCellId, setHoveredCellId] = useState<number | null>(null)

    const totalCells = rowsQuantity * columnsQuantity
    const nearestCount = Math.max(2, Math.ceil(totalCells * 0.2))


    const handleCellClick = (rowIndex: number, colIndex: number) => {
        setMatrix(prev =>
            prev.map((row, r) =>
                row.map((cell, c) =>
                    r === rowIndex && c === colIndex
                        ? { ...cell, amount: cell.amount + 1 }
                        : cell
                )
            )
        )
    }

    const rowSums = matrix.map(row =>
        row.reduce((acc, cell) => acc + cell.amount, 0)
    )

    const colPercentiles = Array.from({ length: columnsQuantity }, (_, colIndex) => {
        const colValues = matrix
            .filter(row => row[colIndex] !== undefined)
            .map(row => row[colIndex].amount)
        return calculatePercentile(colValues, 60)
    })

    useEffect(() => {
        if (rowsQuantity <= 0 || columnsQuantity <= 0) {
            setMatrix([])
            setHighlightedIds([])
            setHoveredCellId(null)
            return
        }
        let idCounter = 1
        const newMatrix: Cell[][] = Array.from({ length: rowsQuantity }, () =>
            Array.from({ length: columnsQuantity }, () => ({
                id: idCounter++,
                amount: getRandomAmount(),
            }))
        )
        setMatrix(newMatrix)
        setHighlightedIds([])
        setHoveredCellId(null)
    }, [rowsQuantity, columnsQuantity])

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
        const nearest = sortedByDistance.slice(0, nearestCount).map(c => c.id)
        setHighlightedIds(nearest)
    }, [matrix, hoveredCellId, nearestCount])

    return (
        <Container>
            {matrix.length === 0 ? <p>Please set rows and columns to generate the matrix.</p> :
                <>
                    <div
                        className={css.grid__container}
                        style={{ gridTemplateColumns: `150px repeat(${columnsQuantity + 1}, minmax(60px, 1fr))` }}
                    >
                        <div className={`${css.cell} ${css.header}`} />
                        {Array.from({ length: columnsQuantity }, (_, i) => (
                            <div key={i} className={`${css.cell} ${css.header}`}>
                                {i + 1}
                            </div>
                        ))}
                        <div className={`${css.cell} ${css.header}`}>SUM</div>
                    </div>

                    {matrix.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={css.grid__container}
                            style={{ gridTemplateColumns: `150px repeat(${columnsQuantity + 1}, minmax(60px, 1fr))` }}
                        >
                            <div className={`${css.cell} ${css.header}`}>{rowIndex + 1}</div>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={cell.id}
                                    className={`${css.cell} ${highlightedIds.includes(cell.id) ? css.highlighted : ""}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    onMouseEnter={() => setHoveredCellId(cell.id)}
                                    onMouseLeave={() => setHoveredCellId(null)}
                                >
                                    {cell.amount}
                                </div>
                            ))}
                            <div className={`${css.cell} ${css.sum}`}>{rowSums[rowIndex]}</div>
                        </div>
                    ))}

                    <div
                        className={css.grid__container}
                        style={{ gridTemplateColumns: `150px repeat(${columnsQuantity + 1}, minmax(60px, 1fr))` }}
                    >
                        <div className={`${css.cell} ${css.header}`}>60th percentile</div>
                        {colPercentiles.map((val, i) => (
                            <div key={i} className={`${css.cell} ${css.percentile}`}>
                                {val}
                            </div>
                        ))}
                        <div className={`${css.cell} ${css.percentile}`}></div>
                    </div>
                </>
            }
        </Container>
    )
}

export default Matrix
