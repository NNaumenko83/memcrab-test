import Container from "../container/container"
import Form from "../form/form"
import css from './header.module.css'


const Header = () => {
    return (
        <header className={css.header}>
            <Container>
                <div className={css.header__content}>
                    <h1>Memcrab</h1>
                    <Form />
                </div>

            </Container>
        </header>
    )
}

export default Header