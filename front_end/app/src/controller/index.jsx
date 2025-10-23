import axios from "axios";

export async function get(tabela) {
  const fetchData = async () => {
    const response = await axios.post(
      "http://localhost:80/Gerenciador-de-pagamentos-boleto/back_end/boleto/get.php",
      { tabela: tabela },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.data.type == "success") {
      return JSON.parse(response.data.data);
    } else {
      return null;
    }
  };
}
