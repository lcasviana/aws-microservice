const produtosModel = require('../models/produtos.model');


const incluir = async (requisicao, resposta) => {
    try {
        const { nome } = requisicao.params;
        if (!nome || !nome.trim())
            return resposta.status(400).json({ message: 'Produto invalido' });

        produtos = await produtosModel.create({ id, nome, descricao, categoria, valorReais });
        return resposta.status(201).json(userJson(produtos));
    } catch {
        return resposta.status(500).json({ message: 'Erro inesperado... :(' });
    }
};

const alterar = async (requisicao, resposta) => {
    try {

        const { id } = requisicao.params;
        if (!id)
            return resposta.status(404).json({ mensagem: `Produto ${id}:${nome} não encontrado.` });

        const produtos = await produtosModel.findOne({ id });
        produtos = await produtosModel.create({ nome, descricao, categoria, valorReais });
        return resposta.status(201).json(userJson(produtos));
    } catch {
        return resposta.status(500).json({ message: 'Erro inesperado... :(' });
    }
};

const listar = async (_, resposta) => {
    try {
        const produtos = await produtosModel.find({});
        return resposta.status(200).json({ produtos });

    } catch (erro) {
        console.error(erro);
        return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
    }
};

const listarId = async (_, resposta) => {
    try {

        const produtos = await proddutosModel.findOne({ id });
        return resposta.status(200).json({ produtos });

    } catch (erro) {
        console.error(erro);
        return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
    }
};

const listarNome = async (_, resposta) => {
    try {

        const produtos = await proddutosModel.findOne({ nome });
        return resposta.status(200).json({ produtos });

    } catch (erro) {
        console.error(erro);
        return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
    }
};

const listarSetor = async (_, resposta) => {
    try {

        const produtos = await proddutosModel.find({ setor });
        return resposta.status(200).json({ produtos });

    } catch (erro) {
        console.error(erro);
        return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
    }
};

const excluir = async (requisicao, resposta) => {
    try {

        const { id } = requisicao.params;
        if (!id)
            return resposta.status(404).json({ mensagem: `Produto ${id}:${nome} não encontrado.` });

        const produtos = await produtosModel.findOne({ id });
        await produtos.remove();

        return resposta.status(200).json({ mensagem: `Produto ${id}:${nome} excluido com sucesso!` });

    } catch (erro) {
        console.error(erro);
        return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
    }
};



module.exports = { listar, listarId, listarNome, listarSetor, incluir, alterar, excluir };