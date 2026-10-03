CREATE DATABASE formulario;
USE formulario;

CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  documento VARCHAR(50),
  numeroDocumento VARCHAR(50),
  name VARCHAR(100),
  lastName VARCHAR(100),
  address VARCHAR(150),
  ciudad VARCHAR(50),
  birthday DATE,
  correo VARCHAR(100),
  celular VARCHAR(20)
);
