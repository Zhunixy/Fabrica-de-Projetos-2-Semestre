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
