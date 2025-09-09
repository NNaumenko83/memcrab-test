import Container from "../container/container"
import Form from "../form/form"
import Button from "../button/button"
import css from './header.module.css'
import { useMatrixContext } from "../../context/matrix-context"

const Header = () => {
    const { rowsQuantity, setRowsQuantity } = useMatrixContext()

    const handleAddRow = () => {
        setRowsQuantity(rowsQuantity + 1)
    }

    return (
        <header className={css.header}>
            <Container>
                <div className={css.header__content}>
                    <h1>Memcrab</h1>
                    <div className={css.header__controls}>
                        <Form />
                        {rowsQuantity > 0 && <Button title="Add row" onClick={handleAddRow} variant="green" />}
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
