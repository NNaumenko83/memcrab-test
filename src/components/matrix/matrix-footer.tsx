import React, { useMemo } from "react"
import css from "./matrix.module.css"
import { calculatePercentile } from "../../utils/calculate-percentile"
import { useMatrixContext } from "../../context/matrix-context"

export const MatrixFooter: React.FC = React.memo(() => {
    const { matrix, columnsQuantity } = useMatrixContext()

    const colPercentiles = useMemo(
        () =>
            Array.from({ length: columnsQuantity }, (_, colIndex) =>
                calculatePercentile(matrix.map(row => row[colIndex]?.amount ?? 0), 60)
            ),
        [matrix, columnsQuantity]
    )

    return (
        <div
            className={css.grid__container}
            style={{ gridTemplateColumns: `150px repeat(${columnsQuantity}, minmax(60px, 1fr)) 100px 100px` }}
        >
            <div className={`${css.cell} ${css.header__block}`}>60th percentile</div>
            {colPercentiles.map((val, i) => (
                <div key={i} className={`${css.cell} ${css.percentile}`}>{val}</div>
            ))}
        </div>
    )
})
