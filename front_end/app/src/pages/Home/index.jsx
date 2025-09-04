import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function HomePage() {
  const { logado, setLogado } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!logado){
      navigate("/Login");
    }  
  }, [logado]);

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
