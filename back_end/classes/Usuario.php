<?php

require_once 'DB.php';
require_once 'Crud.php';

class Usuario extends Crud
{
    public function login(string $login, string $senha) :array {
        try {
            $sql = "select id, login, senha, count(id) as achou from $this->tabela where login = '$login'";
            $sql = DB::prepare($sql);
            $sql->execute();
            $sql = $sql->fetchAll(PDO::FETCH_ASSOC);

            if ($sql[0]['achou'] > 0) {
                if ($sql[0]['senha'] == $senha) {
                    if ($this->sessao($sql[0]['id']) < 1) {
                        return $this->retorno('error', 'Não foi possível iniciar a sessão!');
                    } else {
                        return $this->retorno('success', 'Login efetuado com sucesso!');
                    }
                }
                else {
                    return $this->retorno('error', 'Senha incorreta');
                }
            }
            else {
                return $this->retorno('error', 'Usuário não existe!');  
            }

        } catch (PDOException $e) {
            return $this->retorno('error', 'Não foi possível efetuar login!' );
        }
    }

    public function logout() {
        try{
            session_start();
            session_destroy();

            return $this->retorno('success', "Deslogado");
        } catch (PDOException $e) {
            return $this->retorno('error', "Falha ao deslogar");
        }

    }

    public function sessao(int $id) :int {
        try {
            session_start();

            $_SESSION['ID'] = $id;

            return $id;
        } catch (PDOException $e) {
            return 0;
        }
    }

    public function validacao() :array {
        try {
            session_start();

            if ($_SESSION) {
                return $this->retorno('success', "Valido");
            }
            else {
                return $this->retorno('error', "Invalido");
            }
        } catch (PDOException $e) {
            return $this->retorno('error', $e);
        }
    }

    public function getId() :array {
        try {
            session_start();

            if ($_SESSION) {
                return array(
                    'type' => 'success',
                    'data' => $_SESSION['ID']
                );  
            }
            else {
                return $this->retorno('error', 'é encessario estar logado');
            }
        } catch (PDOException $e) {
            return $this->retorno('error', $e);
        }
    }
}
