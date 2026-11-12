const express = require('express');
const router = express.Router();
const admController = require('../controllers/admController');
const { logado, adm } = require('../middlewares/auth');


router.use(logado, adm);


router.get('/', admController.agenda);
router.get('/servicos', admController.listarServicos);
router.get('/servicos/novo', admController.novoServico);
router.post('/servicos', admController.criarServico);
router.get('/servicos/:id/editar', admController.editarServico);
router.post('/servicos/:id/editar', admController.atualizarServico);
router.post('/servicos/:id/excluir', admController.excluirServico);


module.exports = router;