const vendasModel = require('../models/vendas.model');

const gerar = async (requisicao, resposta) => {
  try {

    const { produtos } = requisicao.body;
    if (!Array.isArray(produtos) || !produtos.length || produtos.some(p => !p.produtoId?.trim() || !p.quantidade))
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
      id: new Date().toISOString(),
      valorReais: produtosResultado.reduce((prev, curr) => prev + curr.valor, 0),
      produtos,
    });

    return resposta.status(201).json(venda);

  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
  }
};

const listar = async (_, resposta) => {
  try {

    const vendas = await vendasModel.find({});
    return resposta.status(200).json({ vendas });

  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
  }
};

const cancelar = async (requisicao, resposta) => {
  try {

    const { id } = requisicao.params;
    if (!id)
      return resposta.status(404).json({ mensagem: `Venda ${id} não encontrada.` });

    const venda = await vendasModel.findOne({ id });
    await venda.remove();

    return resposta.status(200).json({ mensagem: `Venda ${id} cancelada com sucesso!` });

  } catch (erro) {
    console.error(erro);
    return resposta.status(500).json({ mensagem: 'Erro inesperado... :(' });
  }
};

module.exports = { gerar, listar, cancelar };