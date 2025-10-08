<?php

require_once 'DB.php';

$sql = "SELECT * FROM USUARIO";
$sql = DB::prepare($sql);
$sql->execute();
$sql = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sql);