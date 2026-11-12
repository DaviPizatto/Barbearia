const logado = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/login');
};


const adm = (req, res, next) => {
    if (req.session.user.tipo === 'adm') return next();
    res.status(403).send('Acesso restrito a administradores.');
};


module.exports = { logado, adm };