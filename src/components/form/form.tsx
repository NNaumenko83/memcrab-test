import { useState } from "react"
import useTableContext from "../../context/table-context"
import css from "./form.module.css"

const Form = () => {
    const { setRowsQuantity, setColumnsQuantity } = useTableContext()


    const [localRows, setLocalRows] = useState<number | undefined>()
    const [localColumns, setLocalColumns] = useState<number | undefined>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!localRows || !localColumns) return

        setRowsQuantity(localRows)
        setColumnsQuantity(localColumns)
    }

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label htmlFor="rows">Rows:</label>
            <input
                type="number"
                id="rows"
                name="rows"
                placeholder="Enter number of rows"
                value={localRows}
                onChange={(e) => setLocalRows(Math.min(100, Math.max(0, Number(e.target.value))))}
                min={0}
                max={100}
                step={1}
            />

            <label htmlFor="columns">Columns:</label>
            <input
                type="number"
                id="columns"
                name="columns"
                placeholder="Enter number of columns"
                value={localColumns}
                onChange={(e) => setLocalColumns(Math.min(100, Math.max(0, Number(e.target.value))))}
                min={0}
                max={100}
                step={1}
            />

            <button type="submit">Submit</button>
        </form>
    )
}

export default Form
