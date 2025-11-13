import { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
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
  const { userName } = useOutletContext();
  const [boletos, setBoletos] = useState([]);
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
  const [searchMes, setSearchMes] = useState(null);

  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // fetch data
  const fetchData = async () => {
    const response = await get("boleto");
    if (response.data.type === "success") {
      const boletosData = JSON.parse(response.data.data);
      setBoletos(boletosData);

      const meses = [
        ...new Set(boletosData.map((b) => new Date(b.emissao).getMonth())),
      ].sort((a, b) => a - b);

      setMesesDisponiveis(meses);
    }
  };

  // atualiza os boletos de 5 em 5 segundos
  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const boletosFiltrados = useMemo(() => {
    if (searchMes === null) return boletos;
    return boletos.filter(
      (b) => new Date(b.emissao).getMonth() === searchMes
    );
  }, [boletos, searchMes]);

  // 🔹 Estatísticas do gráfico
  const grafoBoleto = useMemo(() => {
    const enviados = boletosFiltrados.length;
    const pagos = boletosFiltrados.filter((b) => b.status == "1").length;
    const pendentes = boletosFiltrados.filter((b) => b.status == "0" && new Date(b.vencimento) > new Date()).length;
    const vencidos = boletosFiltrados.filter((b) => b.status == "0" && new Date(b.vencimento) < new Date()).length;

    return { enviados, pagos, pendentes, vencidos };
  }, [boletosFiltrados]);

  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

  const data = useMemo(
    () => [
      { name: "Pagos", value: grafoBoleto.pagos },
      { name: "Pendentes", value: grafoBoleto.pendentes },
      { name: "Vencidos", value: grafoBoleto.vencidos },
    ],
    [grafoBoleto]
  );

  return (
    <>
      <div className="main-main">
        <h1>
          Bem-vindo ao sistema Gerenciador <span>Usuário(a) {userName}</span>
        </h1>
        <p>
          <i className="fa-solid fa-circle-info"></i> Gerencie, valide e envie
          seus boletos com facilidade <span>Usuário {userName}</span>
        </p>
        <br />
      </div>

      {/* --- Resumo das Estatísticas --- */}
      <div className="estatisticas-container">
        <h2 className="titulo">Resumo de Boletos</h2>
        <p>Resumo dos boletos por Mês</p>

        <div className="filtro-mes">
          <select
            value={searchMes ?? ""}
            onChange={(e) =>
              setSearchMes(e.target.value === "" ? null : parseInt(e.target.value))
            }
          >
            <option value="">Todos os meses</option>
            {mesesDisponiveis.map((mes) => (
              <option key={mes} value={mes}>
                {nomesMeses[mes]}
              </option>
            ))}
          </select>
        </div>

        <div className="estatisticas">
          <div className="card pago">
            <h3>Pagos</h3>
            <p>{grafoBoleto.pagos}</p>
          </div>
          <div className="card pendente">
            <h3>Pendentes</h3>
            <p>{grafoBoleto.pendentes}</p>
          </div>
          <div className="card vencido">
            <h3>Vencidos</h3>
            <p>{grafoBoleto.vencidos}</p>
          </div>
          <div className="card enviados">
            <h3>Total Enviados</h3>
            <p>{grafoBoleto.enviados}</p>
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
