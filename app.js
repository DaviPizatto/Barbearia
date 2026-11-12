require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    res.locals.usuario = req.session.user;
    next();
});


const router = require('./routes/router');
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const admRoutes = require('./routes/admRoutes');


app.use('/', router);
app.use('/', authRoutes);
app.use('/cliente', clienteRoutes);
app.use('/adm', admRoutes);


app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`);
});