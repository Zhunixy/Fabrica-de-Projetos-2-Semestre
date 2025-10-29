import { useState, useMemo, useEffect } from "react";
import "./index.css";
import Modal from "../../components/Modal";
import axios from "axios";
import { get, getDados, post } from "../../controller";
import { useOutletContext} from "react-router-dom";

const tamPagina = 6;

export default function PagamentoPage() {
  const {logado, setLogado, message, setMessage} = useOutletContext();

  // tanto usuarios quanto modificador são temporarios
  const [usuarios, setUsuarios] = useState([]);
  const [modificador, setModificador] = useState(null);

  const [boletos, setBoletos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [selected, setSelected] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [servico, setServico] = useState(null);

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [status, setStatus] = useState("");

  // fetch data
  const fetchData = async () => {
    const response = await get("boleto");
    const response2 = await get("cliente");
    const response3 = await get("servico");
    const response4 = await get("usuario");
    if (response.data.type == "success") {
      setBoletos(JSON.parse(response.data.data));
    }
    if (response2.data.type == "success") {
      setClientes(JSON.parse(response2.data.data));
    }
    if (response3.data.type == "success") {
      setServicos(JSON.parse(response3.data.data));
    }
    if (response4.data.type == "success") {
      setUsuarios(JSON.parse(response4.data.data));
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

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const status = formData.get("status")? 1 : 0

    const boleto = {
      id: null,
      codigo: formData.get("codigo"),
      emissao: formData.get("emissao"),
      vencimento: formData.get("vencimento"),
      valor: parseFloat(formData.get("valor")),
      status: status,
      cliente_id: formData.get("cliente"),
      servico_id: formData.get("servico"),

      // temporario
      modificador: formData.get("modificador"),
    };

    const response = await post("boleto", boleto);

    if (response.data.type == "success") {
      setMessage(response.data.message);
      setOpenModal(false);
      fetchData(); 

    } else {
      setMessage(response.data.message);
    }
  };

  const selecionarLinha = async (divida) => {
    const response = await getDados("boleto", divida.id);
    if (response.data) {
      console.log(response.data);
      setSelected(JSON.parse(response.data));
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (selected) {
      setStatus(selected.status == 1 ? "true" : "");
      setCliente(selected.cliente_id);
      setServico(selected.servico_id);

      // temporario
      setModificador(selected.modificador);
    }else {
      setStatus("");
      setCliente(null);
      setServico(null);

      // temporario
      setModificador(null);
    }
  }, [selected]);

  // atualiza a tabela boletos se a pesquisa for alterada
  useEffect(() => {
    var timeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  // atualiza a tabela boletos de 5 em 5 segundos
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
              <th>Id</th>
              <th>N° do Boleto</th>
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

      {/* 🪟 Modal do formulario */}
      <Modal open={openModal}>
        <form className="modal-form" onSubmit={submitForm}>
          <h2>{selected ? "Editar Boleto" : "Novo Boleto"}</h2>
          <div className="input-group">
            <label>Número do boleto</label>
            <input defaultValue={selected?.codigo || ""} type="text" name="codigo" required/>
          </div>
          <div className="input-group">
            <label>Emissão</label>
            <input defaultValue={selected?.emissao || ""} type="text" name="emissao" required/>
          </div>
          <div className="input-group">
            <label>Vencimento</label>
            <input defaultValue={selected?.vencimento || ""} type="text" name="vencimento" required/>
          </div>
          <div className="input-group">
            <label>Valor</label>
            <input defaultValue={selected?.valor || ""} type="number" name="valor" required step="0.01" min="0" max="9999999"/>
          </div>
          <div className="input-group">
            <label>Status</label>
             <select value={status} onChange={(e) => setStatus(e.target.value)} name="status">
                <option value="">Pendente</option>
                <option value="true">Pago</option>
              </select>
          </div>
          <div className="input-group">
            <label>Cliente</label>
             <select value={cliente} onChange={(e) => setCliente(e.target.value)} required name="cliente">
                  {
                      clientes.map(clt =>
                          <option key={clt.id} value={clt.id}>{clt.id} | {clt.nome} | ({clt.cnpj})</option>
                      )
                  }
              </select>
          </div>
          <div className="input-group">
            <label>Servico</label>
              <select value={servico} onChange={(e) => setServico(e.target.value)} required name="servico">
                {
                  servicos.map(serv =>
                      <option key={serv.id} value={serv.id}>{serv.id} | {serv.descricao}</option>
                  )
                }
              </select>
          </div>
          
          {/* modificador é definido manualmente(é temporario essa parte)*/}
          <div className="input-group">
            <label>Modificador</label>
              <select value={modificador} onChange={(e) => setModificador(e.target.value)} required name="modificador">
                {
                  usuarios.map(mod =>
                      <option key={mod.id} value={mod.id}>{mod.id} | {mod.login}</option>
                  )
                }
              </select>
          </div>
          
          {/* botoes do modal */}
          <div className="modal-actions">
            <button type="button" className="btn-secondary">
              <i className="fa-solid fa-download"></i>
            </button>
            <button type="submit" className="btn-secondary">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" className="btn-danger">
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              type="reset"
              className="btn-close"
              onClick={() => {setOpenModal(false), setSelected(null)}}
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
      <td>{boleto.id}</td>
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
