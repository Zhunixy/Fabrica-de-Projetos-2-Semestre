import { useEffect, useState, useReducer, useMemo } from "react"
import { Link, Outlet } from "react-router-dom";
import minhaImagem from "../../../assets/logo2.png";

export function Menu() {
    const [navOpen, setNavOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // sempre que o width mudar, decide se abre/fecha o menu
        if (width > 768) {
            setNavOpen(true);
        }

    }, [width]);


    return (
        
        <nav>
            <div className="row">
                <img className={`logo ${width > 768 ? "hidden" : ""}`} src={minhaImagem} alt="Logo" />
                <button className={`btn-nav row-end ${width > 768 ? "hidden" : ""}`} onClick={() => {setNavOpen(!navOpen)}}><i class="icon fa-solid fa-list"></i></button>
            </div>
            <ul className={navOpen? "" : "hidden"}>
                <li>
                    <img className={`logo ${width > 768 ? "" : "hidden"}`} src={minhaImagem} alt="Logo" />
                </li>
                <li>
                    <Link to="/">
                        <i className="icon fa-solid fa-house"></i>Home
                    </Link>
                </li>
                <li>
                    <Link to="/Pagamentos">
                        <i className="icon fa-solid fa-bag-shopping"></i>Pagamentos
                    </Link>
                </li>
                <li>
                    <Link to="/Verificacao">
                        <i className="icon fa-solid fa-calendar-check"></i> Verificação
                    </Link>
                </li>
                <li>
                    <Link to="/Tecnica">
                        <i className="icon fa-solid fa-folder"></i>Sobre
                    </Link>
                </li>
                <li className="login">
                    <Link className="ex" to="/Login">
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="footer">
            <p>{new Date().getFullYear()} - Todos os direitos reservados &copy;</p>
        </footer>
    );
}

export function Layout() {
    return (
        <>
        <header>
            <Menu />
        </header>
        <main>
            <Outlet />
        </main>
        <Footer/>
        </>
    );
}
