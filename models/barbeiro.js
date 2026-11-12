const db = require('../db');


const getAll = (callback) => {

    db.query("SELECT id, username FROM users WHERE tipo = 'adm' ORDER BY username", callback);

};


const getByServico = (servicoId, callback) => {

    db.query(

        `SELECT users.id, users.username
         FROM users
         JOIN barbeiro_servico ON barbeiro_servico.barbeiro_id = users.id
         WHERE barbeiro_servico.servico_id = ?
         ORDER BY users.username`,
        [servicoId],
        callback
    );

};


const setServico = (servicoId, barbeiroIds, callback) => {

    db.query('DELETE FROM barbeiro_servico WHERE servico_id = ?', [servicoId], (erro) => {
        if (erro || barbeiroIds.length === 0) return callback(erro);

        const linhas = barbeiroIds.map(barbeiroId => [barbeiroId, servicoId]);

        db.query('INSERT INTO barbeiro_servico (barbeiro_id, servico_id) VALUES ?', [linhas], callback);
    });

};


module.exports = { getAll, getByServico, setServico };