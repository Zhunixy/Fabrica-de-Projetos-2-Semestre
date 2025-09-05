import { useState } from "react";
import "./index.css";

export default function PagamentoPage() {
  const [boletos, setBoletos] = useState([
    {
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/4238952",
      valor: 800,
    },
    {
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/4238952",
      valor: 800,
    },
    {
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/4238952",
      valor: 800,
    },
    {
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/4238952",
      valor: 800,
    },
    {
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/4238952",
      valor: 800,
    },
    {
      nBoleto: "18219",
      cpf: "121212122",
      emissao: "19/06/2000",
      vencimento: "19/06/4238952",
      valor: 800,
    },
  ]);

  return (
    <>
      <div className="main">
        <h1 className="h1-pagamento">Gerenciamento de Pagamentos</h1>
        <p className="desc-pagamento">
          Lorem ipsum dolor sit amet consectetur adipisicir non? Recusandae quo
          iste mollitia?
        </p>
        <div className="form">
          <input type="text" className="search" placeholder="Buscar" />
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
              <LinhaBoleto boleto={boleto}> </LinhaBoleto>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="prox">Próximo</div>
          <div className="ante">Próximo</div>
        </div>
      </div>
    </>
  );
}

function LinhaBoleto({ boleto }) {
  return (
    <tr>
      <td>{boleto.nBoleto}</td>
      <td>{boleto.cpf}</td>
      <td>{boleto.emissao}</td>
      <td>{boleto.vencimento}</td>
      <td>{boleto.valor}</td>
    </tr>
  );
}
