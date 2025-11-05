import { useEffect, useState, useMemo } from "react";
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
import { get } from "../../controller";

export default function HomePage() {
  const [boletos, setBoletos] = useState([]);
  const [grafoBoletos, setGrafoBoletos] = useState({
    enviados: 0,
    pagos: 0,
    pendentes: 0,
    vencidos: 0,
  });

  // fetch data
  const fetchData = async () => {
    const response = await get("boleto");
    if (response.data.type == "success") {
      const boletosData = JSON.parse(response.data.data);
      console.log(boletosData.length)
      setBoletos(boletosData);

      const enviados = boletosData.length;
      const pagos = boletosData.filter((b) => b.status == 1).length;
      const pendentes = boletosData.filter((b) => (b.status == 0 && new Date(b.vencimento) > new Date())).length;
      const vencidos = boletosData.filter((b) => (b.status == 0 && new Date(b.vencimento) < new Date())).length;

      setGrafoBoletos({ enviados, pagos, pendentes, vencidos });
    }
  }

  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

  // atualiza a tabela boletos de 5 em 5 segundos
  useEffect(() => {
    fetchData();
    const intervalo = setInterval(() => {
      fetchData();
    }, 5000);
  
    return () => clearInterval(intervalo); 
  }, []);

  const data = useMemo(() => [
    { name: "Pagos", value: grafoBoletos.pagos },
    { name: "Pendentes", value: grafoBoletos.pendentes },
    { name: "Vencidos", value: grafoBoletos.vencidos },
  ], [grafoBoletos]);

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
            <p>{grafoBoletos.pagos}</p>
          </div>
          <div className="card pendente">
            <h3>Pendentes</h3>
            <p>{grafoBoletos.pendentes}</p>
          </div>
          <div className="card vencido">
            <h3>Vencidos</h3>
            <p>{grafoBoletos.vencidos}</p>
          </div>
          <div className="card enviados">
            <h3>Total Enviados</h3>
            <p>{grafoBoletos.enviados}</p>
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
