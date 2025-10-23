<?php

require_once 'DB.php';

class Crud
{
    protected array $atributos;
    protected string $tabela;

    public function __construct(array $atributos, string $tabela)
    {
        $this->atributos = $atributos;
        $this->tabela = $tabela;
    }

    public function create() :array {
        try {
            $sql = "select count(id) as achou from $this->tabela where login = '" . $this->atributos[0] . "' or cpf = '" . $this->atributos[3] . "'";
            $sql = DB::prepare($sql);
            $sql->execute();
            $sql = $sql->fetchAll(PDO::FETCH_ASSOC);

            if ($sql[0]['achou'] > 0) {
                return array(
                    'type' => 'error',
                    'mensage' => "$this->tabela já existe!"
                );
            }
            else {
                $sql = "insert into $this->tabela values (null";
        
                foreach ($this->atributos as $a) {
                    $sql .= ', ?';
                }
        
                $sql .= ")";
        
                $sql = DB::prepare($sql);
                $sql->execute($this->atributos);

                return array(
                    'type' => 'success',
                    'mensage' => "$this->tabela cadastrado com sucesso!"
                );
            }
        } catch (PDOException $e) {
            return array(
                'type' => 'error',
                'mensage' => "Não foi possível cadastrar $this->tabela!"
            );
        }
    }

    public function read() :array
    {
        $sql = "select * from $this->tabela";
        $sql = DB::prepare($sql);
        $sql->execute();
        $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
        //return json_encode($sql);
        return array(
                'type' => 'success',
                'data' => json_encode($sql)
            );
    }

    public function update(int $id) :array {
        return [];
    }

    public function delete(int $id) :array {
        return [];
    }

    public function getDados(int $id) :string {
        if (gettype($id) == 'integer') {
            $sql = "select * from $this->tabela where id = $id";
            $sql = DB::prepare($sql);
            $sql->execute();
            $sql = $sql->fetch(PDO::FETCH_ASSOC);
            return json_encode($sql);
        }
        else {
            return 'ID Inválido';
        }
    }

    public function retorno(string $type, string $message) :array {
        return array(
            'type' => $type,
            'message' => $message
        );
    }
}
