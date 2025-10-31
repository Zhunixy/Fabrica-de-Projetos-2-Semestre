import { useEffect, useState, useReducer, useMemo } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import minhaImagem from "../../../assets/logo2.png";
import { getDados, getId, validacao } from "../../controller";

export function Menu({ logado, setLogado, logadoID, setLogadoID, userType, setUserType, message, setMessage }) {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const pagina = useLocation().pathname;

  const fetchData = async () => {
    // checa pela validação se esta existe algum usuario logado
    const response1 = await validacao();
    if (response1.data.type == "error"){
      navigate("/Login");
      setMessage("É necessario efetuar login");
      setLogado(false);
      setNavOpen(false);
    }else{
      setLogado(true);
    }

    // checa o id do usuario que esta logado agora
    const response2 = await getId();
    if (response2.data.type == "success"){
      setLogadoID(JSON.parse(response2.data.data));

      // checa o id do usuario que esta logado agora
      const response3 = await getDados('usuario', JSON.parse(response2.data.data));
      if (response3.data){
        setUserType(JSON.parse(response3.data).tipo);
      }
    }else{
      setLogadoID(null);
      setMessage(response2.data.message);
    }
  };

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

    const response2 = await validacao();
    if (response2.data.type == "error"){
      setLogado(false);
      setMessage(response.data.message);
    }
  }

  // retorna para o login se não estiver logado
  useEffect(() => {
    fetchData();
  }, []);

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
        <li className={userType == 0 ? "" : "hidden"}><Link to="/Usuarios"><i className="icon fa-solid fa-users"></i>Usuários</Link></li>
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
  const [ logadoID, setLogadoID ] = useState(null);
  const [ userType, setUserType ] = useState(null);

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
        <Menu logado={logado} setLogado={setLogado} logadoID={logadoID} setLogadoID={setLogadoID} userType={userType} setUserType={setUserType} message={message} setMessage={setMessage} />
      </header>
      <main>
        <div className={`message ${message? "open" : "closed"}`}>
          <div className="message-box">
            {message}
          </div>
        </div>
        <Outlet context={{ logado, setLogado, logadoID, setLogadoID, userType, setUserType, message, setMessage}} />
      </main>
    </>
  );
}
