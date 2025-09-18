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
    {
      id: 13,
      nBoleto: "54373",
      cpf: "121212134",
      emissao: "01/07/2020",
      vencimento: "01/07/2025",
      valor: 1000,
    },
    {
      id: 14,
      nBoleto: "67891",
      cpf: "121212135",
      emissao: "02/07/2020",
      vencimento: "02/07/2025",
      valor: 920,
    },
    {
      id: 15,
      nBoleto: "12345",
      cpf: "121212136",
      emissao: "03/07/2020",
      vencimento: "03/07/2025",
      valor: 1150,
    },
    {
      id: 16,
      nBoleto: "78645",
      cpf: "121212137",
      emissao: "04/07/2020",
      vencimento: "04/07/2025",
      valor: 1250,
    },
    {
      id: 17,
      nBoleto: "98765",
      cpf: "121212138",
      emissao: "05/07/2020",
      vencimento: "05/07/2025",
      valor: 1300,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const boletosAtual = useMemo(() => {
    const primeiroIdx = (paginaAtual - 1) * tamPagina;
    const ultimoIdx = primeiroIdx + tamPagina;
    return boletos.slice(primeiroIdx, ultimoIdx);
  }, [paginaAtual, boletos]);

  const totalPaginas = Math.ceil(boletos.length / tamPagina);

  const selecionarLinha = async (divida) => {
    setSelected(divida);
    setOpenModal(true);
  };

  return (
    <>
      <div className="main">
        <h1 className="h1-pagamento">Gerenciamento de Pagamentos</h1>
        <p className="desc-pagamento">
          Lorem ipsum dolor sit amet consectetur adipisicir non? Recusandae quo
          iste mollitia?
        </p>
        <div className="form">
          <input
            type="text"
            className="search"
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* TABELA DO SENHOR BOLETO */}
        <table className="table">
          <thead className="cabecalho">
            <tr>
              <td>Número do Boleto</td>
              <td>CNPJ/CPF</td>
              <td>Emissão</td>
              <td>Vencimento</td>
              <td>Valor</td>
            </tr>
          </thead>
          {/* Lógica de inserir o dicionario de boletos atraves de uma função map como se fosse um for, e inserir o componente */}
          <tbody>
            {boletosAtual.map((boleto) => (
              <LinhaBoleto
                key={boleto.id}
                boleto={boleto}
                onClick={() => selecionarLinha(boleto)}
              >
                {" "}
              </LinhaBoleto>
            ))}
          </tbody>
        </table>

        {/* botão de criar boleto */}
        <div className="criar-boleto">
          <button
            className="btn-criar"
            onClick={() => {
              setOpenModal(true), setSelected(null);
            }}
          >
            Adicionar Boleto <i class="fa-solid fa-square-plus"></i>
          </button>
        </div>

        {/* paginação ainda inexistente */}
        <div className="pagination">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            disabled={paginaAtual === 1}
          >
            ← Anterior
          </button>
          {[...Array(totalPaginas)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => setPaginaAtual(page)}
                style={{
                  fontWeight: page === paginaAtual ? "bold" : "normal",
                  filter:
                    page === paginaAtual ? "brightness(0.5)" : "brightness(1)",
                }}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
          >
            Próximo →
          </button>
        </div>

        {/* Modal do boleto */}
        <Modal open={openModal}>
          <form>
            <div className="column">
              <h1 className="h1-boletos">Visualização de boletos</h1>
              <p className="p-boletos">Exclua, visualize e edite os boletos</p>

              <div className="">
                <label>Numero do boleto:</label> <br />
                <input defaultValue={selected?.nBoleto} required type="text" />
              </div>
              <div className="">
                <label>CNJ/CPF:</label> <br />
                <input defaultValue={selected?.cpf} required type="text" />
              </div>
              <div className="">
                <label>Emissão</label> <br />
                <input defaultValue={selected?.emissao} required type="text" />
              </div>
              <div className="">
                <label>Vencimento:</label> <br />
                <input
                  defaultValue={selected?.vencimento}
                  required
                  type="text"
                />
              </div>
              <div className="">
                <label>Valor:</label> <br />
                <input defaultValue={selected?.valor} required type="number" />
              </div>

              <div className="row-end btns">
                <div className="visualizar-boleto">
                  <button type="button" className="btn-ver-boleto">
                    Visualizar Boleto <i class="fa-solid fa-link"></i>
                  </button>
                  <button type="button" className="btn-download-boleto">
                    <i class="fa-solid fa-download"></i>
                  </button>
                </div>

                <button type="button" className="btn-deletar">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button type="button" className="btn-editar">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="btn-modal"
                  type="reset"
                  onClick={() => setOpenModal(false)}
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

function LinhaBoleto({ boleto, onClick }) {
  return (
    <tr onClick={onClick}>
      <td>{boleto.nBoleto}</td>
      <td>{boleto.cpf}</td>
      <td>{boleto.emissao}</td>
      <td>{boleto.vencimento}</td>
      <td>{boleto.valor}</td>
    </tr>
  );
}
