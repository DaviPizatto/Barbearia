const bcrypt = require('bcryptjs');
const User = require('../models/user');


const getRegister = (req, res) => {
    res.render('register', { erro: null });
};


const postRegister = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('register', { erro: 'Preencha usuário e senha.' });
    }

    if (password.length < 6) {
        return res.render('register', { erro: 'A senha precisa ter pelo menos 6 caracteres.' });
    }


    bcrypt.hash(password, 12, (erro, senhaHash) => {

        if (erro) return res.render('register', { erro: 'Erro ao cadastrar.' });

        User.create(username, senhaHash, (erro) => {
            if (erro) return res.render('register', { erro: 'Erro ao cadastrar. Esse usuário pode já existir.' });
            res.redirect('/login');
        });

    });
};


const getLogin = (req, res) => {
    res.render('login', { erro: null });
};


const postLogin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('login', { erro: 'Preencha usuário e senha.' });
    }


    User.findByUsername(username, (erro, user) => {
        if (erro) return res.render('login', { erro: 'Ocorreu um erro. Tente novamente.' });
        if (!user) return res.render('login', { erro: 'Usuário ou senha inválidos.' });


        bcrypt.compare(password, user.password, (erro, senhaCerta) => {
            if (erro || !senhaCerta) {
                return res.render('login', { erro: 'Usuário ou senha inválidos.' });
            }


            req.session.user = { id: user.id, username: user.username, tipo: user.tipo };
            req.session.save(() => {
                res.redirect(user.tipo === 'adm' ? '/adm' : '/cliente');
            });
        });
    });
};


const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};


module.exports = { getRegister, postRegister, getLogin, postLogin, logout };