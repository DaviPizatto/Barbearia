const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { logado } = require('../middlewares/auth');


router.use(logado);


router.get('/', clienteController.painel);
router.get('/agendar/:id', clienteController.novo);
router.post('/agendar/:id', clienteController.criar);
router.get('/agendamentos/:id/editar', clienteController.editar);
router.post('/agendamentos/:id/editar', clienteController.atualizar);
router.post('/agendamentos/:id/excluir', clienteController.excluir);


module.exports = router;