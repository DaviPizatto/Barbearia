const db = require('../db');


const getAll = (filtros, callback) => {
    let sql = `SELECT agendamentos.*, users.username AS cliente,
                      barbeiros.username AS barbeiro, servicos.nome AS servico
               FROM agendamentos
               JOIN users ON users.id = agendamentos.user_id
               JOIN users AS barbeiros ON barbeiros.id = agendamentos.barbeiro_id
               JOIN servicos ON servicos.id = agendamentos.servico_id
               WHERE 1 = 1`;
    const valores = [];

    if (filtros.barbeiro) {
        sql += ' AND agendamentos.barbeiro_id = ?';
        valores.push(filtros.barbeiro);
    }
    if (filtros.servico) {
        sql += ' AND agendamentos.servico_id = ?';
        valores.push(filtros.servico);
    }
    if (filtros.data) {
        sql += ' AND agendamentos.data = ?';
        valores.push(filtros.data);
    }
    if (filtros.hora) {
        sql += ' AND agendamentos.hora = ?';
        valores.push(filtros.hora);
    }

    sql += ' ORDER BY agendamentos.data, agendamentos.hora';
    db.query(sql, valores, callback);
};


const getByUser = (userId, callback) => {
    db.query(
        `SELECT agendamentos.*, barbeiros.username AS barbeiro, servicos.nome AS servico
         FROM agendamentos
         JOIN users AS barbeiros ON barbeiros.id = agendamentos.barbeiro_id
         JOIN servicos ON servicos.id = agendamentos.servico_id
         WHERE agendamentos.user_id = ?
         ORDER BY agendamentos.data, agendamentos.hora`,
        [userId],
        callback
    );
};


const getById = (id, userId, callback) => {

    db.query(
        'SELECT * FROM agendamentos WHERE id = ? AND user_id = ?',
        [id, userId],
        (erro, linhas) => {
            if (erro) return callback(erro);
            callback(null, linhas[0]);
        }
    );

};


const create = (dados, callback) => {

    db.query(
        'INSERT INTO agendamentos (user_id, servico_id, barbeiro_id, data, hora) VALUES (?, ?, ?, ?, ?)',
        [dados.user_id, dados.servico_id, dados.barbeiro_id, dados.data, dados.hora],
        callback
    );

};


const update = (id, userId, dados, callback) => {

    db.query(
        'UPDATE agendamentos SET barbeiro_id = ?, data = ?, hora = ? WHERE id = ? AND user_id = ?',
        [dados.barbeiro_id, dados.data, dados.hora, id, userId],
        callback
    );
    
};


const remove = (id, userId, callback) => {
    db.query('DELETE FROM agendamentos WHERE id = ? AND user_id = ?', [id, userId], callback);
};


module.exports = { getAll, getByUser, getById, create, update, remove };