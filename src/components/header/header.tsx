import Container from "../container/container"
import Form from "../form/form"
import css from './header.module.css'


const Header = () => {
    return (
        <header className={css.header}>
            <Container>
                <h1>Memcrab Test</h1>
                <Form />
            </Container>
        </header>
    )
}

export default Header