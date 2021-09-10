create database ahorro;

CREATE TABLE usuario(id SERIAL, email VARCHAR(50) NOT NULL PRIMARY key, password VARCHAR(25), nombre
VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL);

create table tipoIngreso(id serial PRIMARY KEY, concepto varchar(25))

CREATE TABLE operacion(id SERIAL PRIMARY KEY, email VARCHAR(50), monto
INT,  fecha TIMESTAMP, tipo int, FOREIGN KEY (emisor) REFERENCES
usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));

