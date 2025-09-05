import { useState } from "react";
import "./index.css";
import Modal from "../../components/Modal";

export default function PagamentoPage() {
  const [boletos, setBoletos] = useState([
    {
      id: 1,
      nBoleto: "23323",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/2025",
      valor: 800
    },
    {
      id: 2,
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/2025",
      valor: 800
    },
    {
      id: 3,
      nBoleto: "43255",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/2025",
      valor: 800
    },
    {
      id: 4,
      nBoleto: "43256",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/2025",
      valor: 800
    },
    {
      id: 5,
      nBoleto: "98766",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/2025",
      valor: 800
    },
    {
      id: 6,
      nBoleto: "54361",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/2025",
      valor: 800
    }
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
        <p>{selected?.id}</p>
        <div className="form">
          <input type="text" className="search" placeholder="Buscar"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
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
            {boletos.map((boleto) => (
              <LinhaBoleto key={boleto.id} 
                  boleto={boleto}
                  onClick={() => selecionarLinha(boleto)}> </LinhaBoleto>
            ))}
          </tbody>
        </table>
        {/* paginação ainda inexistente */}
        <div className="pagination">
          <div className="prox">Próximo</div>
          <div className="ante">Próximo</div>
        </div>

        {/* Modal do boleto */}
        <Modal open={openModal}>
            <form>
                <div className="column">
                    <div className="row">
                      <label>Numero do boleto:</label>
                      <input defaultValue={selected?.nBoleto} required type="text"/>
                    </div>
                    <div className="row">
                      <label>CNJ/CPF:</label>
                      <input defaultValue={selected?.cpf} required type="text"/>
                    </div>
                    <div className="row">
                      <label>Emissão</label>
                      <input defaultValue={selected?.emissao} required type="text"/>
                    </div>
                    <div className="row">
                      <label>Vencimento:</label>
                      <input defaultValue={selected?.vencimento} required type="text"/>
                    </div>
                    <div className="row">
                      <label >Valor:</label>
                      <input defaultValue={selected?.valor} required type="number" />
                    </div>
                    <div className="row-end">
                        <button type="reset" onClick={() => setOpenModal(false)}>Cancelar</button>
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
    <tr onClick={onClick} >
      <td>{boleto.nBoleto}</td>
      <td>{boleto.cpf}</td>
      <td>{boleto.emissao}</td>
      <td>{boleto.vencimento}</td>
      <td>{boleto.valor}</td>
    </tr>
  );
}
