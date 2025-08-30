export default function HomePage() {
  return (
    <>
      <div className="main">
        <h1>
          Bem-vindo ao sistema <span>Usuario</span>{" "}
        </h1>
        <hr className="hr" />
        <p>
          <i className="fa-solid fa-circle-info"></i> Gerencie, valide e envie os
          seus boletos com facilidade <span>Usuario</span>
        </p>
        <button className="btn">Confira Agora</button>
        <div className="seta">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
      </div>
    </>
  );
}
