import { useState, useMemo, useEffect } from "react";
import "./index.css";
import Modal from "../../components/Modal";
import axios from "axios";
import { get } from "../../controller";

const tamPagina = 6;

export default function PagamentoPage() {
  const [boletos, setBoletos] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // fetch data
  const fetchData = async () => {
      const response = await get("boleto");
      if (response.data.type == "success") {
        console.log("📦 Dados recebidos:", response);
        setBoletos(JSON.parse(response.data.data));
      }
  }

  //🔍 Filtragem por busca
  const boletosFiltrados = useMemo(() => {
    return boletos.filter(
      (b) => b.codigo.includes(search) || b.valor.toString().includes(search)
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

  useEffect(() => {
    var timeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

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
              {/*<th>CNPJ/CPF</th>*/}
              <th>Emissão</th>
              <th>Vencimento</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody>
            {boletosAtual.length > 0 ? (
              boletosAtual.map((boleto) => (
                <LinhaBoleto
                  key={boleto.id}
                  boleto={boleto}
                  onClick={() => selecionarLinha(boleto)}
                ></LinhaBoleto>
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
            <input defaultValue={selected?.codigo || ""} type="text" />
          </div>
          {/*<div className="input-group">
            <label>CPF/CNPJ</label>
            <input defaultValue={selected?.cpf || ""} type="text" />
          </div>*/}
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

function LinhaBoleto({ boleto, onClick }) {
  return (
    <tr key={boleto.id} onClick={onClick}>
      <td>{boleto.codigo}</td>
      <td>{boleto.emissao}</td>
      <td>{boleto.vencimento}</td>
      <td>
        {Number(boleto.valor).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
}
