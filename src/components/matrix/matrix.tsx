import React, { useState, useEffect, useCallback } from "react"
import { useMatrixContext } from "../../context/matrix-context"
import Container from "../container/container"
import { MatrixHeader } from "./matrix-header"
import { MatrixRow } from "./matrix-row"
import { MatrixFooter } from "./matrix-footer"

const Matrix: React.FC = () => {
    const { matrix, rowsQuantity, columnsQuantity } = useMatrixContext()
    const [hoveredCellId, setHoveredCellId] = useState<number | null>(null)
    const [highlightedIds, setHighlightedIds] = useState<number[]>([])
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null)


    useEffect(() => {
        if (hoveredCellId === null) {
            setHighlightedIds([])
            return
        }
        const allCells = matrix.flat()
        const hoveredCell = allCells.find(c => c.id === hoveredCellId)
        if (!hoveredCell) return
        const nearestCount = Math.max(2, Math.ceil(rowsQuantity * columnsQuantity * 0.2))
        const sortedByDistance = allCells
            .filter(c => c.id !== hoveredCellId)
            .sort((a, b) => Math.abs(a.amount - hoveredCell.amount) - Math.abs(b.amount - hoveredCell.amount))
        setHighlightedIds(sortedByDistance.slice(0, nearestCount).map(c => c.id))
    }, [hoveredCellId, matrix, rowsQuantity, columnsQuantity])


    const handleCellHover = useCallback((id: number | null) => setHoveredCellId(id), [])
    const handleRowHover = useCallback((idx: number | null) => setHoveredRowIndex(idx), [])

    if (rowsQuantity === 0 || columnsQuantity === 0) {
        return <Container><p>Please set rows and columns to generate the matrix.</p></Container>
    }

    return (
        <Container>
            <MatrixHeader />
            {matrix.map((row, rowIndex) => (
                <MatrixRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    hoveredRowIndex={hoveredRowIndex}
                    setHoveredRowIndex={handleRowHover}
                    setHoveredCellId={handleCellHover}
                    highlightedIds={highlightedIds}
                />
            ))}
            <MatrixFooter />
        </Container>
    )
}

export default Matrix
