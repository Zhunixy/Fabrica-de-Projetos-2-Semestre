import { useState, useMemo } from "react";
import "./index.css";
import Modal from "../../components/Modal";

const tamPagina = 6;

export default function PagamentoPage() {
  const [boletos, setBoletos] = useState([
    {
      id: 1,
      nBoleto: "23323",
      cpf: "121212122",
      emissao: "19/06/2020",
      vencimento: "19/06/2025",
      valor: 800,
    },
    {
      id: 2,
      nBoleto: "18219",
      cpf: "121212123",
      emissao: "20/06/2020",
      vencimento: "20/06/2025",
      valor: 1200,
    },
    {
      id: 3,
      nBoleto: "43255",
      cpf: "121212124",
      emissao: "21/06/2020",
      vencimento: "21/06/2025",
      valor: 950,
    },
    {
      id: 4,
      nBoleto: "43256",
      cpf: "121212125",
      emissao: "22/06/2020",
      vencimento: "22/06/2025",
      valor: 870,
    },
    {
      id: 5,
      nBoleto: "98766",
      cpf: "121212126",
      emissao: "23/06/2020",
      vencimento: "23/06/2025",
      valor: 1300,
    },
    {
      id: 6,
      nBoleto: "54361",
      cpf: "121212127",
      emissao: "24/06/2020",
      vencimento: "24/06/2025",
      valor: 1150,
    },
    {
      id: 7,
      nBoleto: "65412",
      cpf: "121212128",
      emissao: "25/06/2020",
      vencimento: "25/06/2025",
      valor: 750,
    },
    {
      id: 8,
      nBoleto: "23456",
      cpf: "121212129",
      emissao: "26/06/2020",
      vencimento: "26/06/2025",
      valor: 820,
    },
    {
      id: 9,
      nBoleto: "98721",
      cpf: "121212130",
      emissao: "27/06/2020",
      vencimento: "27/06/2025",
      valor: 980,
    },
    {
      id: 10,
      nBoleto: "65431",
      cpf: "121212131",
      emissao: "28/06/2020",
      vencimento: "28/06/2025",
      valor: 860,
    },
    {
      id: 11,
      nBoleto: "45672",
      cpf: "121212132",
      emissao: "29/06/2020",
      vencimento: "29/06/2025",
      valor: 1050,
    },
    {
      id: 12,
      nBoleto: "87654",
      cpf: "121212133",
      emissao: "30/06/2020",
      vencimento: "30/06/2025",
      valor: 1100,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // 🔍 Filtragem por busca
  const boletosFiltrados = useMemo(() => {
    return boletos.filter(
      (b) =>
        b.nBoleto.includes(search) ||
        b.cpf.includes(search) ||
        b.valor.toString().includes(search)
    );
  }, [search, boletos]);

  // 🔢 Paginação
  const totalPaginas = Math.ceil(boletosFiltrados.length / tamPagina);
  const boletosAtual = useMemo(() => {
    const start = (paginaAtual - 1) * tamPagina;
    return boletosFiltrados.slice(start, start + tamPagina);
  }, [paginaAtual, boletosFiltrados]);

  const selecionarLinha = (divida) => {
    setSelected(divida);
    setOpenModal(true);
  };

  return (
    <div className="main">
      <header className="pagamento-header">
        <h1>Gerenciamento de Pagamentos</h1>
        <p>Visualize, edite e adicione boletos de forma simples e rápida.</p>
      </header>
      <div className="form">
        <input
          type="text"
          className="search"
          placeholder="Buscar boleto, CPF ou valor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>N° do Boleto</th>
              <th>CNPJ/CPF</th>
              <th>Emissão</th>
              <th>Vencimento</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {boletosAtual.length > 0 ? (
              boletosAtual.map((boleto) => (
                <tr key={boleto.id} onClick={() => selecionarLinha(boleto)}>
                  <td>{boleto.nBoleto}</td>
                  <td>{boleto.cpf}</td>
                  <td>{boleto.emissao}</td>
                  <td>{boleto.vencimento}</td>
                  <td>{boleto.valor.toLocaleString("pt-BR")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  Nenhum boleto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="criar-boleto">
        <button
          className="btn-criar"
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
        >
          <i className="fa-solid fa-square-plus"></i> Novo Boleto
        </button>
      </div>
      {/* 📄 Paginação */}
      {totalPaginas > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            disabled={paginaAtual === 1}
          >
            ←
          </button>
          {[...Array(totalPaginas)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                className={page === paginaAtual ? "active" : ""}
                onClick={() => setPaginaAtual(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
          >
            →
          </button>
        </div>
      )}
      {/* 🪟 Modal */}
      <Modal open={openModal}>
        <form className="modal-form">
          <h2>{selected ? "Editar Boleto" : "Novo Boleto"}</h2>
          <div className="input-group">
            <label>Número do boleto</label>
            <input defaultValue={selected?.nBoleto || ""} type="text" />
          </div>
          <div className="input-group">
            <label>CPF/CNPJ</label>
            <input defaultValue={selected?.cpf || ""} type="text" />
          </div>
          <div className="input-group">
            <label>Emissão</label>
            <input defaultValue={selected?.emissao || ""} type="text" />
          </div>
          <div className="input-group">
            <label>Vencimento</label>
            <input defaultValue={selected?.vencimento || ""} type="text" />
          </div>
          <div className="input-group">
            <label>Valor</label>
            <input defaultValue={selected?.valor || ""} type="number" />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary">
              <i className="fa-solid fa-download"></i>
            </button>
            <button type="button" className="btn-secondary">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" className="btn-danger">
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenModal(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
