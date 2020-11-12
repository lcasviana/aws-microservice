const mongoose = require('mongoose');
const vendasModel = require('../models/vendas.model');
const fetch = require('node-fetch');

const vendaJson = (venda) => ({
  id: venda._id,
  produtos: venda.produtos.map(p => ({
    produtoId: p.produtoId,
    quantidade: p.quantidade
  })),
  valorReais: venda.valorReais,
});

const gerar = async (requisicao, resposta) => {
  try {

    const produtos = requisicao.body?.produtos;
    if (!produtos || !Array.isArray(produtos) || !produtos.length || produtos.some(p =>
      !p.produtoId || typeof p.produtoId !== 'string' || !p.produtoId.trim() || !p.quantidade || typeof p.quantidade !== 'number'))
      return resposta.status(400).json({ mensagem: 'Lista inválida de produtos.' });

    const produtosSucesso = [], produtosErro = [];
    for (let i = 0; i < produtos.length; i++) {
      try {
        const p = (await (await fetch(`http://localhost:8080/api/v1/produtos/${produtos[i].produtoId}`)).json());
        console.log(p);
        produtosSucesso.push({ valor: p.precoReais, ...produtos[i] })
      } catch (err) {
        console.error(err);
        produtosErro.push(produtos[i].id);
      }
    }

    if (produtosErro.length)
      return resposta.status(404).json({ mensagem: `Produtos ${produtosErro.join(', ')} não encontrados` });

    const venda = await vendasModel.create({
      valorReais: produtosSucesso.reduce((prev, curr) => prev + curr.valor, 0),
      produtos,
    });

    return resposta.status(201).json(vendaJson(venda));

  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
  }
};

const listar = async (_, resposta) => {
  try {

    const vendas = await vendasModel.find({});
    return resposta.status(200).json({ vendas: vendas.map(v => vendaJson(v)) });

  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
  }
};

const cancelar = async (requisicao, resposta) => {
  try {

    const id = requisicao.params?.id;
    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id))
      return resposta.status(400).json({ mensagem: 'Id inválido.' });

    const venda = await vendasModel.findOne({ '_id': mongoose.Types.ObjectId(id) });
    if (!venda)
      return resposta.status(404).json({ mensagem: `Venda ${id} não encontrada.` });

    await venda.remove();
    return resposta.status(200).json({ mensagem: `Venda ${id} cancelada com sucesso!` });

  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
  }
};

module.exports = { gerar, listar, cancelar };