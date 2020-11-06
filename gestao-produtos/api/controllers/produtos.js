const uuidv4 = require('uuid/v4');

module.exports = app => {
  const produtosDB = app.data.produtos;
  const controller = {};

  const {
    produtos: produtosMock,
  } = produtosDB;

  controller.listProdutos = (_, res) => res.status(200).json(produtosDB);


  controller.saveProdutos = (req, res) => {

    if (!req.body.nome || typeof req.body.nome !== 'string' || !req.body.nome.trim()
      || !req.body.descricao || typeof req.body.descricao !== 'string' || !req.body.descricao.trim()
      || !req.body.setor || typeof req.body.setor !== 'string' || !req.body.setor.trim()
      || !req.body.precoReais || typeof req.body.precoReais !== 'number' || Number.isNaN(req.body.precoReais) || req.body.precoReais < 0) 
      
       return res.status(400).json({ message: 'Cadastro inválido'});

      produtosMock.data.push({
        id: uuidv4(),
        nome: req.body.nome,
        descricao: req.body.descricao,
        setor: req.body.setor,
        precoReais: req.body.precoReais,
    });

      res.status(201).json(produtosMock);
    };


controller.removeProdutos = (req, res) => {
  const {
    id,
  } = req.params;

  const foundProdutosIndex = produtosMock.data.findIndex(produtos => produtos.id === id);

  if (foundProdutosIndex === -1) {
    res.status(404).json({
      message: 'Produto não encontrado na base.',
      success: false,
      produtos: produtosMock,
    });
  } else {
    produtosMock.data.splice(foundProdutosIndex, 1);
    res.status(200).json({
      message: 'Produto encontrado e deletado com sucesso!',
      success: true,
      produtos: produtosMock,
    });
  }
};

controller.updateProdutos = (req, res) => {

  if (!req.body.nome || typeof req.body.nome !== 'string' || !req.body.nome.trim()
  || !req.body.descricao || typeof req.body.descricao !== 'string' || !req.body.descricao.trim()
  || !req.body.setor || typeof req.body.setor !== 'string' || !req.body.setor.trim()
  || !req.body.precoReais || typeof req.body.precoReais !== 'number' || Number.isNaN(req.body.precoReais) || req.body.precoReais < 0) 

   return res.status(400).json({ message: 'Cadastro inválido'});

  const {
    id,
  } = req.params;

  const foundProdutosIndex = produtosMock.data.findIndex(produtos => produtos.id === id);

  if (foundProdutosIndex === -1) {
    res.status(404).json({
      message: 'Produtos não encontrado na base.',
      success: false,
      produtos: produtosMock,
    });
  } else {
    const newProdutos = {
      id: id,
      nome: req.body.nome,
      descricao: req.body.descricao,
      setor: req.body.setor,
      precoReais: req.body.precoReais,
      createdAt: new Date()
    };

    produtosMock.data.splice(foundProdutosIndex, 1, newProdutos);

    res.status(200).json({
      message: 'Produto encontrado e atualizado com sucesso!',
      success: true,
      produtos: produtosMock,
    });
  }
}

return controller;
}