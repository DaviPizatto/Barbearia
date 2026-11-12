const db = require('../db');


const findByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (erro, linhas) => {
        if (erro) return callback(erro);
        callback(null, linhas[0]);
    });
};


const create = (username, senhaHash, callback) => {
    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, senhaHash],
        callback
    );
};


module.exports = { findByUsername, create };