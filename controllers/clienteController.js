const Agendamento = require('../models/agendamento');
const Servico = require('../models/servico');
const Barbeiro = require('../models/barbeiro');


const painel = (req, res) => {

    Agendamento.getByUser(req.session.user.id, (erro, agendamentos) => {
        if (erro) return res.status(500).send('Erro ao buscar agendamentos.');
        res.render('cliente', { agendamentos });
    });

};


const novo = (req, res) => {

    Servico.getById(req.params.id, (erro, servico) => {

        if (erro) return res.status(500).send('Erro ao buscar serviço.');
        if (!servico) return res.status(404).send('Serviço não encontrado.');

        Barbeiro.getByServico(servico.id, (erro, barbeiros) => {
            if (erro) return res.status(500).send('Erro ao buscar barbeiros.');

            const hoje = new Date().toISOString().slice(0, 10);
            res.render('agendamento-form', {
                servico, barbeiros, hoje,
                agendamento: {},
                acao: `/cliente/agendar/${servico.id}`

            });
        });

    });

};


const criar = (req, res) => {

    const dados = {
        user_id: req.session.user.id,
        servico_id: req.params.id,
        barbeiro_id: req.body.barbeiro_id,
        data: req.body.data,
        hora: req.body.hora
    };

    Agendamento.create(dados, (erro) => {
        if (erro) return res.status(400).send('Não foi possível agendar. Esse barbeiro pode já ter um agendamento nesse dia e horário.');
        res.redirect('/cliente');
    });
};


const editar = (req, res) => {

    Agendamento.getById(req.params.id, req.session.user.id, (erro, agendamento) => {
        if (erro) return res.status(500).send('Erro ao buscar agendamento.');
        if (!agendamento) return res.status(404).send('Agendamento não encontrado.');

        Servico.getById(agendamento.servico_id, (erro, servico) => {
            if (erro) return res.status(500).send('Erro ao buscar serviço.');

            Barbeiro.getByServico(servico.id, (erro, barbeiros) => {
                if (erro) return res.status(500).send('Erro ao buscar barbeiros.');

                const hoje = new Date().toISOString().slice(0, 10);
                res.render('agendamento-form', {
                    servico, barbeiros, hoje, agendamento,
                    acao: `/cliente/agendamentos/${agendamento.id}/editar`
                });
            });
        });
    });

};


const atualizar = (req, res) => {

    Agendamento.update(req.params.id, req.session.user.id, req.body, (erro) => {
        if (erro) return res.status(400).send('Não foi possível remarcar. Esse barbeiro pode já ter um agendamento nesse dia e horário.');
        res.redirect('/cliente');
    });

};


const excluir = (req, res) => {

    Agendamento.remove(req.params.id, req.session.user.id, (erro) => {
        if (erro) return res.status(500).send('Erro ao cancelar.');
        res.redirect('/cliente');
    });
    
};


module.exports = { painel, novo, criar, editar, atualizar, excluir };