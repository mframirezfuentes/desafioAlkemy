create database ahorro;

CREATE TABLE usuario(
     id SERIAL,
     email VARCHAR(50) NOT NULL PRIMARY key, 
     password VARCHAR(25), 
     nombre VARCHAR(50) NOT NULL,
     apellido VARCHAR(50) NOT NULL);

CREATE TABLE operacion(
	id SERIAL,
	email VARCHAR(50),
	monto INT,
	fecha TIMESTAMP,
	tipo VARCHAR(10), 
	PRIMARY KEY (id),
	FOREIGN KEY (email) REFERENCES usuario(email));
					 

