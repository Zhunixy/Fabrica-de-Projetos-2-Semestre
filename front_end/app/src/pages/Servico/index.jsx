import { useState, useMemo, useEffect } from "react";
import Modal from "../../components/Modal";
import axios from "axios";
import { get, getDados, post } from "../../controller";
import { useOutletContext} from "react-router-dom";
import md5 from "md5";

const tamPagina = 6;

export default function ServicoPage() {
  const {logado, setLogado, logadoID, setLogadoID, message, setMessage} = useOutletContext();

  const [servicos, setServicos] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // fetch data
  const fetchData = async () => {
    const response = await get("servico");
    if (response.data.type == "success") {
      setServicos(JSON.parse(response.data.data));
    }
  }

  //🔍 Filtragem por busca
  const servicosFiltrados = useMemo(() => {
    return servicos.filter(
      (s) => s.nome.includes(search)
    );
  }, [search, servicos]);

  // 🔢 Paginação
  const totalPaginas = Math.ceil(servicosFiltrados.length / tamPagina);
  const servicosAtual = useMemo(() => {
    const start = (paginaAtual - 1) * tamPagina;
    return servicosFiltrados.slice(start, start + tamPagina);
  }, [paginaAtual, servicosFiltrados]);

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const servico = {
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      preco: parseFloat(formData.get("preco")),
      modificador: logadoID,
    };

    const response = await post("servico", servico);

    if (response.data.type == "success") {
      setMessage(response.data.message);
      setOpenModal(false);
      fetchData(); 

    } else {
      setMessage(response.data.message);
    }

    form.reset();
  };

  const selecionarLinha = async (servico) => {
    const response = await getDados("servico", servico.id);
    if (response.data) {
      setSelected(JSON.parse(response.data));
      setOpenModal(true);
    }
  };

  // atualiza a tabela servicos se a pesquisa for alterada
  useEffect(() => {
    var timeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  // atualiza a tabela servicos de 5 em 5 segundos
  useEffect(() => {
    fetchData();
    const intervalo = setInterval(() => {
      fetchData();
    }, 5000);
  
    return () => clearInterval(intervalo); 
  }, []);

  return (
    <div className="main">
      <header className="pagamento-header">
        <h1>Gerenciamento de Usuários</h1>
        <p>Visualize, edite e adicione Usuários de forma simples e rápida.</p>
      </header>
      <div className="form">
        <input
          type="text"
          className="search"
          placeholder="Buscar por Nome...."
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
              <th>Id</th>
              <th>Nome</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {servicosAtual.length > 0 ? (
              servicosAtual.map((servico) => (
                <LinhaServico
                  key={servico.id}
                  servico={servico}
                  onClick={() => selecionarLinha(servico)}
                ></LinhaServico>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  Nenhum Servico encontrado.
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
          <i className="fa-solid fa-square-plus"></i> Novo Servico
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

      {/* 🪟 Modal do formulario */}
      <Modal open={openModal}>
        <form className="modal-form" onSubmit={submitForm}>
          <h2>{selected ? "Editar Servico" : "Novo Servico"}</h2>
          <div className="input-group">
            <label>Nome</label>
            <input
              defaultValue={selected?.nome || ""}
              type="text"
              name="nome"
              required
            />
          </div>
          <div className="input-group">
            <label>Descrição:</label>
            <textarea defaultValue={selected?.descricao} required name="descricao"></textarea>
          </div>
          <div className="input-group">
            <label>Preço</label>
            <input defaultValue={selected?.preco || ""} type="number" name="preco" required step="0.01" min="0" onWheel={(e) => e.target.blur()} />
          </div>

          {/* botoes do modal */}
          <div className="modal-actions">
            <button type="submit" className="btn-secondary">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" className="btn-danger">
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              type="reset"
              className="btn-close"
              onClick={() => {
                setOpenModal(false), setSelected(null);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function LinhaServico({ servico, onClick }) {
  return (
    <tr key={servico.id} onClick={onClick}>
      <td>{servico.id}</td>
      <td>{servico.nome}</td>
      <td>
        {Number(servico.preco).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
}
