<?php

// CONFIGURAÇÕES DO BANCO DE DADOS
define('SERVIDOR', 'localhost:3306');
define('USUARIO', 'root');
define('SENHA', '');
define('BANCO', 'dbBoletos');

// LIMPA DOS DADOS
function limpaDados($dados)
{
    $dados = trim($dados);
    $dados = stripcslashes($dados);
    $dados = htmlspecialchars($dados);
    return $dados;
}
