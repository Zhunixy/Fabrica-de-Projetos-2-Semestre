create database dbBoletos;

use dbBoletos;
drop database dbBoletos;

create table usuario(
id int auto_increment,
login varchar(24) not null unique,
senha varchar(16) not null,
tipo int not null,
cpf varchar(14) not null unique,
nome varchar(128) not null,
contato varchar(17) not null,
primary key(id)
);

create table cliente(
id int auto_increment,
cnpj varchar(19) not null unique,
nome varchar(128) not null,
email varchar(50) not null unique,
contato varchar(17) not null,
modificador int,
primary key(id),
foreign key(modificacao) references usuario(id)
);

create table sistema(
id int auto_increment,
nome varchar(45) not null,
descricao varchar(200) not null,
preco decimal(4, 2) not null,
modificador int,
primary key(id),
foreign key(modificacao) references usuario(id)
);

create table boleto(
id int auto_increment,
codigo varchar(50) not null unique,
emissao datetime not null,
vencimento datetime not null,
valor decimal(4, 2) not null,
`status` binary(1) not null,
cliente_id int,
sistema_id int,
modificador int,
primary key(id),
foreign key(cliente_id) references cliente(id),
foreign key(sistema_id) references sistema(id),
foreign key(modificador) references usuario(id)
);