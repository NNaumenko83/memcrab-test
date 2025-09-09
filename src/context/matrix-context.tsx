import { createContext, useContext, useEffect, useState } from "react"
import type { Cell } from "../types/cell"

type MatrixContextType = {
    matrix: Cell[][]
    setMatrix: (matrix: Cell[][]) => void
    addRow: () => void
    deleteRow: (rowIndex: number) => void
    incrementCell: (rowIndex: number, colIndex: number) => void
    rowsQuantity: number
    columnsQuantity: number
    setRowsQuantity: (n: number) => void
    setColumnsQuantity: (n: number) => void
}

export const MatrixContext = createContext<MatrixContextType | undefined>(undefined)

export const MatrixProvider = ({ children }: { children: React.ReactNode }) => {
    const [rowsQuantity, setRowsQuantity] = useState(0)
    const [columnsQuantity, setColumnsQuantity] = useState(0)
    const [matrix, setMatrix] = useState<Cell[][]>([])

    const addRow = () => {
        const newRow: Cell[] = Array.from({ length: columnsQuantity }, (_, i) => ({
            id: matrix.flat().length + i + 1,
            amount: Math.floor(Math.random() * 1000)
        }))
        setMatrix(prev => [...prev, newRow])
        setRowsQuantity(prev => prev + 1)
    }

    const deleteRow = (rowIndex: number) => {
        setMatrix(prev => prev.filter((_, i) => i !== rowIndex))
        setRowsQuantity(prev => prev - 1)
    }

    const incrementCell = (rowIndex: number, colIndex: number) => {
        setMatrix(prev =>
            prev.map((row, r) =>
                row.map((cell, c) =>
                    r === rowIndex && c === colIndex ? { ...cell, amount: cell.amount + 1 } : cell
                )
            )
        )
    }

    useEffect(() => {
        setMatrix(prev => {
            let newMatrix = prev.map(row => [...row])


            if (rowsQuantity > prev.length) {
                let nextId = prev.flat().reduce((max, cell) => Math.max(max, cell.id), 0) + 1
                for (let i = prev.length; i < rowsQuantity; i++) {
                    const newRow: Cell[] = Array.from({ length: columnsQuantity }, () => ({
                        id: nextId++,
                        amount: Math.floor(Math.random() * 1000)
                    }))
                    newMatrix.push(newRow)
                }
            } else if (rowsQuantity < prev.length) {
                newMatrix = newMatrix.slice(0, rowsQuantity)
            }


            if (columnsQuantity !== 0) {
                newMatrix = newMatrix.map(row => {
                    if (columnsQuantity > row.length) {
                        let nextId = row.flat().reduce((max, cell) => Math.max(max, cell.id), 0) + 1
                        const extraCells: Cell[] = Array.from({ length: columnsQuantity - row.length }, () => ({
                            id: nextId++,
                            amount: Math.floor(Math.random() * 1000)
                        }))
                        return [...row, ...extraCells]
                    } else if (columnsQuantity < row.length) {
                        return row.slice(0, columnsQuantity)
                    }
                    return row
                })
            }

            return newMatrix
        })
    }, [rowsQuantity, columnsQuantity])


    return (
        <MatrixContext.Provider
            value={{
                matrix,
                setMatrix,
                addRow,
                deleteRow,
                incrementCell,
                rowsQuantity,
                columnsQuantity,
                setRowsQuantity,
                setColumnsQuantity
            }}
        >
            {children}
        </MatrixContext.Provider>
    )
}

export function useMatrixContext() {
    const context = useContext(MatrixContext)
    if (!context) throw new Error("useMatrixContext must be used within MatrixProvider")
    return context
}
