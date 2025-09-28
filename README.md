# Sistema de E-commerce em PHP (POO)

## 👥 Integrantes do Grupo
- Nome Completo: __________________ (RA: _______)
- Nome Completo: __________________ (RA: _______)
- Nome Completo: __________________ (RA: _______)

<hr>

## 🚀 Passo a Passo para Executar o Projeto

<h2>### 1. Clonar o repositório</h1>
git clone https://github.com/seu-repositorio/projeto-poo-php.git
cd projeto-poo-php
<hr>
<h2>2. Instalar dependências via Composer</h2>
Certifique-se de que o Composer está instalado.

No diretório do projeto, execute:  

composer install
<hr>
<h2>3. Executar o projeto</h2>
Utilizamos o xampp para rodar o nosso projeto em um servidor local

Abra o xampp e habilite a opção APACHE

Logo em seguida digite no seu navegador "localhost/diretorio do projeto"

OBS: O Diretorio precisa estar na pasta C:/xampp/htdocs para rodar

E acessar em: http://localhost/index.php
<hr>
<h1>📌 Funcionamento do Sistema</h1>
O sistema simula uma plataforma de e-commerce entre Clientes e Vendedores, com controle de estoque, carrinho e contas bancárias.
<hr>
<h2>Classes Principais</h2>
Usuario: Classe base para Cliente e Vendedor. Possui login/logout.

Cliente: Pode adicionar produtos ao carrinho, remover e realizar compras.

Vendedor: Pode cadastrar produtos no estoque e listar/remover itens.

Produto: Representa um jogo com nome, preço, estoque e vendedor responsável.

ContaBancaria / ContaPagamento / ContaCorrente: Estrutura financeira para depósitos, saques e transferências entre cliente e vendedor.
<hr>
<h2>Fluxo de Execução</h2>
O cliente realiza login e deposita saldo em sua conta.

O vendedor adiciona produtos ao estoque.

O cliente adiciona produtos ao carrinho e lista os itens.

Ao finalizar a compra:

O sistema verifica o estoque disponível.

O sistema calcula o valor total.

Se houver saldo suficiente, o valor é transferido para a conta do vendedor.

O estoque é atualizado e o carrinho do cliente é esvaziado.

<h1>🛠️ Tecnologias Utilizadas</h1>
PHP 8+

Composer (Autoloading de Classes - PSR-4)

Programação Orientada a Objetos (POO)

