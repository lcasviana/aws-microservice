const mongoose = require('mongoose');
const vendasModel = require('../models/vendas.model');

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

    const produtos = requisicao?.body?.produtos;
    if (!produtos || !Array.isArray(produtos) || !produtos.length || produtos.some(p =>
      !p.produtoId || typeof p.produtoId !== 'string' || !p.produtoId?.trim() || !p.quantidade || typeof p.quantidade !== 'number'))
      return resposta.status(400).json({ mensagem: 'Lista inválida de produtos.' });

    const produtosPromises = produtos.map(produto => {
      try {
        const valor = Math.floor(Math.random() * Math.floor(9)) + 1;
        return Promise.resolve({ valor, ...produto });
      } catch {
        return Promise.reject(produto.produtoId);
      }
    });

    const produtosResultado = await Promise.all(produtosPromises);
    const produtosNaoEncontrados = produtosResultado.filter(produto => produto instanceof Error);
    if (produtosNaoEncontrados.length)
      return resposta.status(404).json({ mensagem: `Produtos ${produtosNaoEncontrados.join(' ,')} não encontrados` });

    const venda = await vendasModel.create({
      valorReais: produtosResultado.reduce((prev, curr) => prev + curr.valor, 0),
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

    const id = requisicao?.params?.id;
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