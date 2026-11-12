const db = require('../db');


const getAll = (callback) => {
    db.query('SELECT * FROM categorias ORDER BY nome', callback);
};


module.exports = { getAll };