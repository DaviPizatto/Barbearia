DROP TABLE IF EXISTS agendamentos;
DROP TABLE IF EXISTS barbeiro_servico;
DROP TABLE IF EXISTS barbeiros;
DROP TABLE IF EXISTS servicos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'adm') NOT NULL DEFAULT 'cliente',
    criado DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);


CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(8,2) NOT NULL,
    duracao_min INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


CREATE TABLE barbeiro_servico (
    barbeiro_id INT NOT NULL,
    servico_id INT NOT NULL,
    PRIMARY KEY (barbeiro_id, servico_id),
    FOREIGN KEY (barbeiro_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);


CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    barbeiro_id INT NOT NULL,
    servico_id INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    criado DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (barbeiro_id, data, hora),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (barbeiro_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);