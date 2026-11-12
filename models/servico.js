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


const create = (dados, callback) => {

    db.query(

        'INSERT INTO servicos (nome, descricao, preco, duracao_min, categoria_id) VALUES (?, ?, ?, ?, ?)',

        [dados.nome, dados.descricao, dados.preco, dados.duracao_min, dados.categoria_id],
        callback
    );
};


const update = (id, dados, callback) => {
    
    db.query(

        'UPDATE servicos SET nome = ?, descricao = ?, preco = ?, duracao_min = ?, categoria_id = ? WHERE id = ?',
        [dados.nome, dados.descricao, dados.preco, dados.duracao_min, dados.categoria_id, id],
        callback

    );

};


const remove = (id, callback) => {
    db.query('DELETE FROM servicos WHERE id = ?', [id], callback);
};


module.exports = { getAll, getById, create, update, remove };