import css from './container.module.css'

const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className={css.container}>{children}</div>
}

export default Container
