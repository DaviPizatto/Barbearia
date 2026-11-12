-- Senhas dos usuários de teste (gravadas como hash bcrypt):
--   barbeiros (adm) -> admin123
--   clientes        -> cliente123
INSERT INTO users (username, password, tipo) VALUES
('Rafael', '$2b$12$DfhzNJAIqGtcksYyzb11Ie6H/h.t1rOzd6GNrnbl0Tc/U0tpKkt.S', 'adm'),
('Marcos', '$2b$12$DfhzNJAIqGtcksYyzb11Ie6H/h.t1rOzd6GNrnbl0Tc/U0tpKkt.S', 'adm'),
('Thiago', '$2b$12$DfhzNJAIqGtcksYyzb11Ie6H/h.t1rOzd6GNrnbl0Tc/U0tpKkt.S', 'adm'),
('Lucas',  '$2b$12$DfhzNJAIqGtcksYyzb11Ie6H/h.t1rOzd6GNrnbl0Tc/U0tpKkt.S', 'adm'),
('Andre',  '$2b$12$DfhzNJAIqGtcksYyzb11Ie6H/h.t1rOzd6GNrnbl0Tc/U0tpKkt.S', 'adm'),
('joao',   '$2b$12$vCUkunT7bmpz471VrJQ39uG/Uo9FU5d0LqblaCC1neeo2uTb40P1u', 'cliente'),
('pedro',  '$2b$12$vCUkunT7bmpz471VrJQ39uG/Uo9FU5d0LqblaCC1neeo2uTb40P1u', 'cliente'),
('carlos', '$2b$12$vCUkunT7bmpz471VrJQ39uG/Uo9FU5d0LqblaCC1neeo2uTb40P1u', 'cliente'),
('miguel', '$2b$12$vCUkunT7bmpz471VrJQ39uG/Uo9FU5d0LqblaCC1neeo2uTb40P1u', 'cliente');

INSERT INTO categorias (nome) VALUES
('Cabelo'), ('Barba'), ('Combos'), ('Tratamentos'), ('Infantil');

INSERT INTO servicos (nome, descricao, preco, duracao_min, categoria_id) VALUES
('Corte Social',       'Corte clássico na tesoura e máquina.',          45.00, 40, 1),
('Degradê',            'Degradê navalhado nas laterais.',               50.00, 45, 1),
('Barba Completa',     'Modelagem com toalha quente e navalha.',        35.00, 30, 2),
('Pezinho e Contorno', 'Acabamento de nuca e costeletas.',              15.00, 15, 2),
('Cabelo + Barba',     'Corte à escolha e barba completa.',             75.00, 70, 3),
('Hidratação Capilar', 'Hidratação com massagem no couro cabeludo.',    30.00, 25, 4),
('Corte Infantil',     'Corte para crianças até 12 anos.',              35.00, 30, 5);

-- barbeiro_id = id do usuário adm (1 Rafael, 2 Marcos, 3 Thiago, 4 Lucas, 5 Andre)
INSERT INTO barbeiro_servico (barbeiro_id, servico_id) VALUES
(1, 1), (1, 2), (1, 5),
(2, 3), (2, 4), (2, 5),
(3, 1), (3, 5),
(4, 7),
(5, 6);

-- user_id = cliente (6 joao, 7 pedro, 8 carlos, 9 miguel) | barbeiro_id = adm
INSERT INTO agendamentos (user_id, barbeiro_id, servico_id, data, hora) VALUES
(6, 1, 2, '2026-12-01', '09:00'),
(7, 2, 3, '2026-12-01', '10:00'),
(8, 3, 1, '2026-12-02', '14:00'),
(9, 1, 5, '2026-12-02', '15:00'),
(6, 5, 6, '2026-12-03', '11:00');