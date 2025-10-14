import { useEffect, useState, useReducer, useMemo } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import minhaImagem from "../../../assets/logo2.png";

export function Menu({ logado, setLogado }) {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const pagina = useLocation().pathname;

  return (
    <nav>
      <div className="row">
        <img
          className={"logo"}
          onClick={() => {
            logado ? setNavOpen(!navOpen) : navigate("/login");
          }}
          src={minhaImagem}
          alt="Logo"
        />

        <li className={`login ${pagina === "/Login" || pagina === "/Cadastro" ? "hidden" : ""}`}
            style={{ listStyle: "none" }}>
          <Link
            className="ex"
            to="/Login"
            onClick={() => {logado ? setLogado(false) : "";}}>
              {logado ? "Logout" : "Login"}
          </Link>
        </li>
      </div>
      <ul className={`menuAnima ${navOpen && logado ? "open" : "closed"} ${pagina === "/Login" || pagina === "/Login" ? "hidden" : ""}`}>
        <li><Link to="/"><i className="icon fa-solid fa-house"></i>Home</Link></li>
        <li><Link to="/Pagamentos"><i className="icon fa-solid fa-bag-shopping"></i>Pagamentos</Link></li>
        <li><Link to="/Tecnica"><i className="icon fa-solid fa-folder"></i>Sobre</Link></li>
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

export default function Layout() {
  const [logado, setLogado] = useState(false);

  return (
    <>
      <header>
        <Menu logado={logado} setLogado={setLogado} />
      </header>
      <main>
        <Outlet context={{ logado, setLogado }} />
      </main>
      <Footer />
    </>
  );
}
