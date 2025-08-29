import bg from '../../../assets/bg.jpg';

export default function Cadastro() {
  return (
    <div className="main2">
      <div className="form-container">
        <h1>Cadastro</h1>
        <hr className="hr" />
        <form>
          <input type="text" placeholder="Nome Completo" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Senha" required />
          <input type="password" placeholder="Confirmar Senha" required />
          <button type="submit">Cadastrar</button>
          
        </form>
        <p>
          Já possui uma conta? <a href="/">Login</a>
        </p>
      </div>

      <img className="img" src={bg} alt="Background" />
    </div>
  );
}
