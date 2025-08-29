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
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/">Pagamentos</Link>
        </li>

        <li>
          <Link to="/">Verificação</Link>
        </li>

        <li>
          <Link to="/Tecnica">Sobre</Link>
        </li>

        <li className="login">
          <Link to="/">Login</Link>
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
      <Footer />
    </>
  );
}
