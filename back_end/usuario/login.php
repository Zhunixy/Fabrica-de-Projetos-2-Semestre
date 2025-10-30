<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

require_once "../classes/Usuario.php";

$input = json_decode(file_get_contents("php://input"), true);

$login = $input['login'] ?? '';
$senha = $input['senha'] ?? '';

$usuario = new Usuario([], 'usuario');

echo json_encode($usuario->login($login, md5($senha)));
