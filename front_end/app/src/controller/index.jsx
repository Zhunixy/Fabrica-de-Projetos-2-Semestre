import axios from "axios";

export async function get(tabela) {
  const response = await axios.post(
    "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/services/get.php",
    {tab: tabela},
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  return response;
}

export async function getDados(tabela, id) {
  const response = await axios.post(
    "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/services/getDados.php",
    {
      tab: tabela,
      id: id,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  return response;
}

export async function post(tabela, dados) {
  const response = await axios.post(
    "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/services/post.php",
    {
      tab: tabela,
      dados: dados,
    },
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  return response;
}
