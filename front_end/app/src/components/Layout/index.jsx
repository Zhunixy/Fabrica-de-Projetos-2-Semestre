import { Link, Outlet } from "react-router-dom"

export function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Tecnica">Tecnica</Link>
                </li>
            </ul>
        </nav>)
}

export function Footer() {
    return <footer>
        <p>{new Date().getFullYear()} - Todos os direitos reservados &copy;</p>
    </footer>
}

export function Layout() {
    return <>
        <header>
            <Menu />
        </header>
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
}