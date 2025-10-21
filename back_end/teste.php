<?php

require_once 'classes/Usuario.php';

$usuario = new Usuario(['teste', md5('teste'), 1, '111.111.111-11', 'Teste', '14 45465-4562'], 'usuario');
// var_dump($usuario->login('teste', md5('teste')));
var_dump($usuario->validacao());
// var_dump($usuario->logout());

if ($_SESSION) {
    echo $usuario->getDados($_SESSION['ID']);
}