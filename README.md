# Sistema de E-commerce em PHP (POO)

## 👥 Integrantes do Grupo
- Nome Completo: __________________ (RA: _______)
- Nome Completo: __________________ (RA: _______)
- Nome Completo: __________________ (RA: _______)

---

## 🚀 Passo a Passo para Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-repositorio/projeto-poo-php.git
cd projeto-poo-php
2. Instalar dependências via Composer
Certifique-se de que o Composer está instalado.
No diretório do projeto, execute:

bash
Copiar código
composer install
3. Executar o projeto
Você pode rodar diretamente com o servidor embutido do PHP:

bash
Copiar código
php -S localhost:8000
E acessar em: http://localhost:8000/index.php

📌 Funcionamento do Sistema
O sistema simula uma plataforma de e-commerce entre Clientes e Vendedores, com controle de estoque, carrinho e contas bancárias.

Classes Principais
Usuario: Classe base para Cliente e Vendedor. Possui login/logout.

Cliente: Pode adicionar produtos ao carrinho, remover e realizar compras.

Vendedor: Pode cadastrar produtos no estoque e listar/remover itens.

Produto: Representa um jogo com nome, preço, estoque e vendedor responsável.

ContaBancaria / ContaPagamento / ContaCorrente: Estrutura financeira para depósitos, saques e transferências entre cliente e vendedor.

Fluxo de Execução
O cliente realiza login e deposita saldo em sua conta.

O vendedor adiciona produtos ao estoque.

O cliente adiciona produtos ao carrinho e lista os itens.

Ao finalizar a compra:

O sistema verifica o estoque disponível.

O sistema calcula o valor total.

Se houver saldo suficiente, o valor é transferido para a conta do vendedor.

O estoque é atualizado e o carrinho do cliente é esvaziado.

🛠️ Tecnologias Utilizadas
PHP 8+

Composer (Autoloading de Classes - PSR-4)

Programação Orientada a Objetos (POO)

