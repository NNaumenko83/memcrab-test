import React from "react"
import css from "./matrix.module.css"
import { useMatrixContext } from "../../context/matrix-context"

export const MatrixHeader: React.FC = React.memo(() => {
    const { columnsQuantity } = useMatrixContext()

    return (
        <div
            className={`${css.grid__container} ${css.header}`}
            style={{ gridTemplateColumns: `150px repeat(${columnsQuantity}, minmax(60px, 1fr)) 100px 100px` }}
        >
            <div className={`${css.cell} ${css.header__block}`} />
            {Array.from({ length: columnsQuantity }, (_, i) => (
                <div key={i} className={`${css.cell} ${css.header}`}>{i + 1}</div>
            ))}
            <div className={`${css.cell} ${css.header}`}>SUM</div>
            <div className={`${css.cell} ${css.header}`} />
        </div>
    )
})
