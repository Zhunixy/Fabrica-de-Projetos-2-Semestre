import { Link, Outlet } from "react-router-dom";
import minhaImagem from "../../../assets/logo2.png";

export function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <img className="logo" src={minhaImagem} alt="Logo" />
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
