import bg from "../../../assets/bg.jpg";
import { Link } from "react-router-dom";

export default function Logar() {
  return (
    <div className="main2">
      <div className="form-container">
        <h1>Logar</h1>
        <hr className="hr" />
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Senha" required />
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
