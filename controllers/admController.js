const Agendamento = require('../models/agendamento');
const Servico = require('../models/servico');
const Barbeiro = require('../models/barbeiro');
const Categoria = require('../models/categoria');


const agenda = (req, res) => {

    Agendamento.getAll(req.query, (erro, agendamentos) => {
        if (erro) return res.status(500).send('Erro ao buscar agendamentos.');

        Barbeiro.getAll((erro, barbeiros) => {
            if (erro) return res.status(500).send('Erro ao buscar barbeiros.');

            Servico.getAll((erro, servicos) => {
                if (erro) return res.status(500).send('Erro ao buscar serviços.');
                res.render('adm', { agendamentos, barbeiros, servicos, filtros: req.query });
            });
        });
    });

};


const listarServicos = (req, res) => {

    Servico.getAll((erro, servicos) => {
        if (erro) return res.status(500).send('Erro ao buscar serviços.');
        res.render('adm-servicos', { servicos });
    });

};


const novoServico = (req, res) => {

    Categoria.getAll((erro, categorias) => {
        if (erro) return res.status(500).send('Erro ao buscar categorias.');

        Barbeiro.getAll((erro, barbeiros) => {
            if (erro) return res.status(500).send('Erro ao buscar barbeiros.');
            res.render('servico-form', { servico: {}, categorias, barbeiros, marcados: [], acao: '/adm/servicos' });
        });
    });

};


const criarServico = (req, res) => {

    const barbeiros = [].concat(req.body.barbeiros || []);

    Servico.create(req.body, (erro, resultado) => {
        if (erro) return res.status(500).send('Erro ao cadastrar serviço.');

        Barbeiro.setServico(resultado.insertId, barbeiros, (erro) => {
            if (erro) return res.status(500).send('Erro ao salvar barbeiros do serviço.');
            res.redirect('/adm/servicos');
        });
    });

};


const editarServico = (req, res) => {

    Servico.getById(req.params.id, (erro, servico) => {

        if (erro) return res.status(500).send('Erro ao buscar serviço.');
        if (!servico) return res.status(404).send('Serviço não encontrado.');

        Categoria.getAll((erro, categorias) => {
            if (erro) return res.status(500).send('Erro ao buscar categorias.');

            Barbeiro.getAll((erro, barbeiros) => {
                if (erro) return res.status(500).send('Erro ao buscar barbeiros.');

                Barbeiro.getByServico(servico.id, (erro, doServico) => {
                    if (erro) return res.status(500).send('Erro ao buscar barbeiros.');

                    const marcados = doServico.map(barbeiro => barbeiro.id);
                    res.render('servico-form', { servico, categorias, barbeiros, marcados, acao: `/adm/servicos/${servico.id}/editar` });
                });
            });
        });

    });

};


const atualizarServico = (req, res) => {

    const barbeiros = [].concat(req.body.barbeiros || []);

    Servico.update(req.params.id, req.body, (erro) => {
        if (erro) return res.status(500).send('Erro ao atualizar serviço.');

        Barbeiro.setServico(req.params.id, barbeiros, (erro) => {
            if (erro) return res.status(500).send('Erro ao salvar barbeiros do serviço.');
            res.redirect('/adm/servicos');
        });
    });

};


const excluirServico = (req, res) => {

    Servico.remove(req.params.id, (erro) => {
        if (erro) return res.status(500).send('Erro ao remover serviço.');
        res.redirect('/adm/servicos');
    });
    
};


module.exports = {
    agenda, listarServicos, novoServico, criarServico, editarServico, atualizarServico, excluirServico
};