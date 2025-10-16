<?php

require_once 'classes/Usuario.php';

$usuario = new Usuario(['teste', md5('teste'), 1, '111.111.111-11', 'Teste', '14 45465-4562'], 'usuario');
var_dump($usuario->create());