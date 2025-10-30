import { useEffect, useState, useReducer, useMemo } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import minhaImagem from "../../../assets/logo2.png";

export function Menu({ logado, setLogado, message, setMessage }) {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const pagina = useLocation().pathname;

  const deslogar = async () => {
    const response = await axios.get(
      "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/usuario/logout.php",
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    setMessage(response.data.message);
    setLogado(false);
  }

  // retorna para o login se não estiver logado
  useEffect(() => {
    if (!logado) {
      navigate("/Login");
      setNavOpen(false)
    }
  }, [logado]);

  return (
    <nav>
      <div className="row">
        <img
          className={"logo"}
          onClick={() => {
            pagina === "/Login" || pagina === "/Cadastro" ? "" : (logado ? setNavOpen(!navOpen) : "");
          }}
          src={minhaImagem}
          alt="Logo"
        />

        <li className={`login ${pagina === "/Login" || pagina === "/Cadastro" ? "hidden" : ""}`}
            style={{ listStyle: "none" }}>
          <Link
            className="ex"
            to="/Login"
            onClick={() => {logado ? deslogar() : "";}}>
              Logout
          </Link>
        </li>
      </div>
      <ul className={`menuAnima ${navOpen ? "open" : "closed"} ${logado ? "" : "hidden"}`}>
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
  const [ message, setMessage ] = useState('');

  /*//checar a sessão, se retorna sucess setLogado(true) se não setLogado(false)(não funciona por enquanto)
  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/usuario/validacao.php",
      {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  
    setMessage(response.data.message);
    if (response.data.type == "success") {
      setLogado(true);
  
    } else {
      setLogado(false);
    }
  }
  
  // checa se esta logado de 5 em 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      fetchData();
    }, 5000);
  
    return () => clearInterval(intervalo);
  }, []);*/

  // redefine mensagem por apenas 5 segundos
  useEffect(() => {
      var timeout = setTimeout(() => {
          setMessage('');
      }, 5000);

      return () => {
          clearTimeout(timeout);
      }
  }, [message]);

  return (
    <>
      <header>
        <Menu logado={logado} setLogado={setLogado} message={message} setMessage={setMessage} />
      </header>
      <main>
        <div className={`message ${message? "open" : "closed"}`}>
          <div className="message-box">
            {message}
          </div>
        </div>
        <Outlet context={{ logado, setLogado, message, setMessage}} />
      </main>
    </>
  );
}
