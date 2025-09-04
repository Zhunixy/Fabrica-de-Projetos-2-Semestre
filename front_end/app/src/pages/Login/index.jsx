import bg from "../../../assets/bg.jpg";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

export default function Logar() {
  const { logado, setLogado } = useOutletContext();
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    

    const usuario = {
      email: formData.get("email"),
      senha: formData.get("senha")
    };

    if (usuario.email == "teste@teste" && usuario.senha == "1234"){
      setLogado(true);
      navigate("/"); // redireciona para home
    }
  }

  return (
    <div className="main2">
      <div className="form-container">
        <h1>Logar</h1>
        <hr className="hr" />
        <form onSubmit={submitForm}>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Senha" name="senha" required />
          <button type="submit">Logar</button>
        </form>
        <p>
          Não possuí uma conta?{" "}
          <Link className="ex" to="/Cadastro">
            Cadastre-se
          </Link>
        </p>
      </div>

      <img className="img" src={bg} alt="Background" />
    </div>
  );
}
