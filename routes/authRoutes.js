const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { logado, adm } = require('../middlewares/auth');


router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);


router.get('/cliente', logado, authController.getCliente);
router.get('/adm', logado, adm, authController.getAdm);


module.exports = router;