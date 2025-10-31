import { useState, useMemo, useEffect } from "react";
import "./index.css";
import Modal from "../../components/Modal";
import axios from "axios";
import { get, getDados, post } from "../../controller";
import { useOutletContext} from "react-router-dom";

const tamPagina = 6;

export default function UsuarioPage() {
  const {logado, setLogado, message, setMessage} = useOutletContext();

  const [usuarios, setUsuarios] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // fetch data
  const fetchData = async () => {
    const response = await get("usuario");
    if (response.data.type == "success") {
      setUsuarios(JSON.parse(response.data.data));
    }
  }

  //🔍 Filtragem por busca
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(
      (b) => b.codigo.includes(search) || b.valor.toString().includes(search)
    );
  }, [search, usuarios]);

  // 🔢 Paginação
  const totalPaginas = Math.ceil(usuariosFiltrados.length / tamPagina);
  const usuariosAtual = useMemo(() => {
    const start = (paginaAtual - 1) * tamPagina;
    return usuariosFiltrados.slice(start, start + tamPagina);
  }, [paginaAtual, usuariosFiltrados]);

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const usuario = {
      login: formData.get("login"),
      senha: formData.get("senha"),
      tipo: formData.get("tipo"),
      cpf: formData.get("cpf"),
      nome: formData.get("nome"),
      contato: formData.get("contato"),
    };

    const response = await post("usuario", usuario);

    if (response.data.type == "success") {
      setMessage(response.data.message);
      setOpenModal(false);
      fetchData(); 

    } else {
      setMessage(response.data.message);
    }

    form.reset();
  };

  const selecionarLinha = async (usuario) => {
    const response = await getDados("usuario", usuario.id);
    if (response.data) {
      setSelected(JSON.parse(response.data));
      setOpenModal(true);
    }
  };

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
        <h1>Gerenciamento de Usuários</h1>
        <p>Visualize, edite e adicione Usuários de forma simples e rápida.</p>
      </header>
      <div className="form">
        <input
          type="text"
          className="search"
          placeholder="Buscar Nome ou Cpf...."
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
              <th>Login</th>
              <th>Cpf</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {usuariosAtual.length > 0 ? (
              usuariosAtual.map((usuario) => (
                <LinhaUsuario
                  key={usuario.id}
                  usuario={usuario}
                  onClick={() => selecionarLinha(usuario)}
                ></LinhaUsuario>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  Nenhum usuário encontrado.
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
          <i className="fa-solid fa-square-plus"></i> Novo Usuário
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
          <h2>{selected ? "Editar Usuário" : "Novo Usuário"}</h2>
          <div className="input-group">
            <label>Login</label>
            <input
              defaultValue={selected?.login || ""}
              type="text"
              name="login"
              required
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input
              defaultValue={selected?.senha || ""}
              type="password"
              name="senha"
              required
            />
          </div>
          <div className="input-group">
            <label>Tipo</label>
            <input
              defaultValue={selected?.tipo || ""}
              type="number"
              name="tipo"
              onWheel={(e) => e.target.blur()}
              required
            />
          </div>
          <div className="input-group">
            <label>Cpf</label>
            <input
              defaultValue={selected?.cpf || ""}
              type="text"
              name="cpf"
              required
            />
          </div>
          <div className="input-group">
            <label>nome</label>
            <input
              defaultValue={selected?.nome || ""}
              type="text"
              name="nome"
              required
            />
          </div>
          <div className="input-group">
            <label>Contato</label>
            <input
              defaultValue={selected?.contato || ""}
              type="text"
              name="contato"
              required
            />
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

function LinhaUsuario({ usuario, onClick }) {
  return (
    <tr key={usuario.id} onClick={onClick}>
      <td>{usuario.id}</td>
      <td>{usuario.login}</td>
      <td>{usuario.cpf}</td>
      <td>{usuario.nome}</td>
    </tr>
  );
}
