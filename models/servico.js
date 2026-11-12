const db = require('../db');


const getAll = (callback) => {
    db.query(
        `SELECT servicos.*, categorias.nome AS categoria
         FROM servicos
         JOIN categorias ON categorias.id = servicos.categoria_id
         ORDER BY categorias.nome, servicos.nome`,
        callback
    );
};


const getById = (id, callback) => {
    db.query(
        `SELECT servicos.*, categorias.nome AS categoria
         FROM servicos
         JOIN categorias ON categorias.id = servicos.categoria_id
         WHERE servicos.id = ?`,
        [id],
            
        (erro, linhas) => {
            if (erro) return callback(erro);
            callback(null, linhas[0]);
        }
    );
};


module.exports = { getAll, getById };