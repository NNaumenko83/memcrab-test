import React, { useEffect, useState } from "react"
import useTableContext from "../../context/table-context"
import type { Cell } from "../../types/cell"
import css from "./matrix.module.css"
import Container from "../container/container"
import { calculatePercentile } from "../../utils/calculate-percentile"
import { getRandomAmount } from "../../utils/get-random-amount"




const Matrix: React.FC = () => {
    const { rowsQuantity, columnsQuantity } = useTableContext()
    const [matrix, setMatrix] = useState<Cell[][]>([])

    useEffect(() => {
        if (rowsQuantity <= 0 || columnsQuantity <= 0) {
            setMatrix([])
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
    }, [rowsQuantity, columnsQuantity])

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

    if (!matrix.length) return <div>No data</div>

    const rowSums = matrix.map(row =>
        row.reduce((acc, cell) => acc + cell.amount, 0)
    )

    const colPercentiles = Array.from({ length: columnsQuantity }, (_, colIndex) => {
        const colValues = matrix
            .filter(row => row[colIndex] !== undefined)
            .map(row => row[colIndex].amount)
        return calculatePercentile(colValues, 60)
    })

    return (
        <Container>
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
                            className={css.cell}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
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
        </Container>
    )
}

export default Matrix
