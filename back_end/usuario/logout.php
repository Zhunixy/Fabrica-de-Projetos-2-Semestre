<?php

require_once '../classes/Usuario.php';

$usuario = new Usuario([], '');
echo json_encode($usuario->logout());