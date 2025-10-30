<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

require_once '../classes/Usuario.php';

$usuario = new Usuario([], '');

echo json_encode($usuario->logout());
