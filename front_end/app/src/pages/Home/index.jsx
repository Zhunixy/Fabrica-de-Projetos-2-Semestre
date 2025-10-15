import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./home.css";

export default function HomePage() {
  const { logado, setLogado } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!logado) {
      navigate("/Login");
    }
  }, [logado]);

  const boletos = {
    enviados: 100,
    pagos: 80,
    pendentes: 15,
    vencidos: 5,
  };

  const data = [
    { name: "Pagos", value: boletos.pagos },
    { name: "Pendentes", value: boletos.pendentes },
    { name: "Vencidos", value: boletos.vencidos },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

  return (
    <>
      <div className="main-main">
        <h1>
          Bem-vindo ao sistema Gerenciador <span>Usuário(a)</span>
        </h1>
        <p>
          <i className="fa-solid fa-circle-info"></i> Gerencie, valide e envie
          seus boletos com facilidade <span>Usuário</span>
        </p>
        <br />
        <button className="btn">Confira Agora</button>
      </div>

      {/* --- Resumo das Estatísticas --- */}
      <div className="estatisticas-container">
        <h2 className="titulo">Resumo de Boletos</h2>
        <p>Resumo dos boletos por Mês</p>
        <div className="filtro-mes">
          <select name="" id="">
            <option value="">Janeiro</option>
            <option value="">Fevereiro</option>
            <option value="">Março</option>
            <option value="">Maio</option>
            <option value="">Abril</option>
            <option value="">Junho</option>
            <option value="">Julho</option>
            <option value="">Agosto</option>
            <option value="">Setembro</option>
            <option value="">Outubro</option>
            <option value="">Novembro</option>
            <option value="">Dezembro</option>
          </select>
        </div>
        <div className="estatisticas">
          <div className="card pago">
            <h3>Pagos</h3>
            <p>{boletos.pagos}</p>
          </div>
          <div className="card pendente">
            <h3>Pendentes</h3>
            <p>{boletos.pendentes}</p>
          </div>
          <div className="card vencido">
            <h3>Vencidos</h3>
            <p>{boletos.vencidos}</p>
          </div>
          <div className="card enviados">
            <h3>Total Enviados</h3>
            <p>{boletos.enviados}</p>
          </div>
        </div>

        {/* --- Gráfico de Pizza --- */}
        <div className="grafico">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
