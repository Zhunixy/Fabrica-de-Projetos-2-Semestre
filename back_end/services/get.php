<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require_once "../classes/Crud.php";

$input = json_decode(file_get_contents("php://input"), true);

$tabela = $input['tabela'] ?? '';

$boleto = new Crud([], $tabela);
echo json_encode($boleto->read());
