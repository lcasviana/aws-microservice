const path = require('path');
const Vendas = require('../models/vendas.model');

const gerar = async (requisicao, resposta) => {
  try {

    const { produtos } = requisicao.body;
    if (!Array.isArray(produtos))
      return resposta.status(400).json({ mensagem: 'Produtos não é uma lista' });

    if (!produtos.length)
      return resposta.status(400).json({ mensagem: 'Lista vazia' });

    const produtosPromises = produtos.map(produto => {
      try {
        return Promise.resolve({});
      } catch {
        return Promise.reject(undefined);
      }
    });

    const produtosResultado = await Promise.all(produtosPromises);
    if (produtosResultado.some(produto => !produto))
      return resposta.status(404).json({ mensagem: 'Produtos não encontrados' });



  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado' });
  }
};

const listar = async (requisicao, resposta) => {
  try {



  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado' });
  }
};

const cancelar = async (requisicao, resposta) => {
  try {



  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado' });
  }
};

module.exports = { gerar, listar, cancelar };