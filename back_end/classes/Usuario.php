<?php

require_once 'DB.php';
require_once 'Crud.php';

class Usuario extends Crud
{
    public function login(string $login, string $senha) {
        try {
            $sql = "select id, login, senha, count(id) as achou from $this->tabela where login = '$login'";
            $sql = DB::prepare($sql);
            $sql->execute();
            $sql = $sql->fetchAll(PDO::FETCH_ASSOC);

            if ($sql[0]['achou'] > 0) {
                if ($sql[0]['senha'] == $senha) {
                    return array(
                        'type' => 'success',
                        'mensage' => 'Login efetuado com sucesso!',
                        'id' => $sql[0]['id']
                    );
                }
                else {
                    return array(
                        'type' => 'error',
                        'mensage' => 'Senha incorreta'
                    );
                }
            }
            else {
                return array(
                    'type' => 'error',
                    'mensage' => 'Usuário não existe!'
                );  
            }

        } catch (PDOException $e) {
            return array(
                'type' => 'error',
                'mensage' => $e 
            );
        }
    }
}
