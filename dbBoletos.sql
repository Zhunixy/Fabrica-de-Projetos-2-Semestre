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

create table pagador(
id int auto_increment,
cnpj varchar(19) not null unique,
nome varchar(128) not null,
email varchar(50) not null unique,
contato varchar(17) not null,
modificador int,
primary key(id),
foreign key(modificacao) references usuario(id)
);

create table beneficiado(
id int auto_increment,
codigo varchar(50) not null unique,
nome varchar(128) not null,
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
pagador_id int,
beneficiado_id int,
modificador int,
primary key(id),
foreign key(pagador_id) references pagador(id),
foreign key(beneficiado_id) references beneficiado(id),
foreign key(modificador) references usuario(id)
);