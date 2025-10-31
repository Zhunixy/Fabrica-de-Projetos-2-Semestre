import bg from "../../../assets/bg.jpg";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { getId, validacao, getDados } from "../../controller";
// import cors from "cors";

export default function Logar() {
  const { logado, setLogado, logadoID, setLogadoID, userType, setUserType, message, setMessage } = useOutletContext();
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
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.data.type == "success") {
      const response2 = await validacao();
      if (response2.data.type == "success"){
        setLogado(true);
        setMessage(response.data.message);
        navigate("/"); // redireciona para home
        
        // checa o id do usuario que esta logado agora
        const response3 = await getId();
        if (response3.data.type == "success"){
          setLogadoID(JSON.parse(response3.data.data));

          // checa o id do usuario que esta logado agora
          const response4 = await getDados('usuario', JSON.parse(response3.data.data));
          if (response4.data){
            setUserType(JSON.parse(response4.data).tipo);
          }
        }else{
          setLogadoID(null);
          setMessage(response2.data.message);
        }
      }
    } else {
      setMessage(response.data.message);
    }

    form.reset();
  };

  useEffect(() => {
    const valida = async ()=>{
      const response = await validacao();
      if (response.data.type == "success"){
        setLogado(true);
        setMessage("Usuario já logado");
        navigate("/"); // redireciona para home
      }
    }
    valida();
  }, []);

  return (
    <div className="main2">
      <div className="form-container">
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

