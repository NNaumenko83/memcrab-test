import { useState } from "react"
import { useMatrixContext } from "../../context/matrix-context"
import css from "./form.module.css"
import Button from "../button/button"
import InputField from "./input-field/input-field"

const Form = () => {
    const { setRowsQuantity, setColumnsQuantity } = useMatrixContext()

    const [localRows, setLocalRows] = useState<number | undefined>()
    const [localColumns, setLocalColumns] = useState<number | undefined>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!localRows || !localColumns) return

        setRowsQuantity(localRows)
        setColumnsQuantity(localColumns)
        setLocalRows(undefined)
        setLocalColumns(undefined)
    }

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <InputField id="rows" label="Rows" value={localRows} onChange={setLocalRows} />
            <InputField id="columns" label="Columns" value={localColumns} onChange={setLocalColumns} />
            <Button title="Generate" type="submit" disabled={!localRows || !localColumns} />
        </form>
    )
}

export default Form
