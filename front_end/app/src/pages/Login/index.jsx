import bg from "../../../assets/bg.jpg";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import cors from "cors";

export default function Logar() {
  const { logado, setLogado } = useOutletContext();
  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const usuario = {
      login: formData.get("email"),
      senha: formData.get("senha"),
    };

    const response = await axios.post(
      "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/usuario/login.php",
      usuario,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.data.type == "success") {
      setMessage(response.data.message);
      setLogado(true);
      navigate("/"); // redireciona para home

    } else {
      setMessage(response.data.message);
    }
  };

  useEffect(() => {
      var timeout = setTimeout(() => {
          setMessage('');
      }, 5000);

      return () => {
          clearTimeout(timeout);
      }
  }, [message]);

  return (
    <div className="main2">
      <div className="form-container">
        <div className={`message ${message? "open" : "closed"}`}>
            <div>
                {message}
            </div>
        </div>
        <h1>Logar</h1>
        <hr className="hr" />
        <form onSubmit={submitForm}>
          <input type="text" placeholder="Email" name="email" required />
          <input type="password" placeholder="Senha" name="senha" required />
          <button type="submit">Logar</button>
        </form>
      </div>

      <img className="img" src={bg} alt="Background" />

    </div>
  );
}

