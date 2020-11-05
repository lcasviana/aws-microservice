const express = require('express');
const router = express.Router();
const produtos = require('../controllers/produtos.controller');

router.get('/', (requisicao, resposta) => {
  console.log('GET /produtos', requisicao, resposta);
  produtos.listar(requisicao, resposta);
});

router.get('/:id', (requisicao, resposta) => {
  console.log('GET /produtos', requisicao, resposta);
  produtos.listarId(requisicao, resposta);
});

router.get('/:nome', (requisicao, resposta) => {
  console.log('GET /produtos', requisicao, resposta);
  produtos.listarNome(requisicao, resposta);
});

router.get('/:setor', (requisicao, resposta) => {
  console.log('GET /produtos', requisicao, resposta);
  produtos.listarSetor(requisicao, resposta);
});

router.post('/', (requisicao, resposta) => {
  console.log('POST /produtos', requisicao, resposta);
  produtos.incluir(requisicao, resposta);
});

router.patch('/:id', (requisicao, resposta) => {
  console.log('PATCH /produtos', requisicao, resposta);
  produtos.alterar(requisicao, resposta);
});

router.delete('/:id', (requisicao, resposta) => {
  console.log('DELETE /produtos', requisicao, resposta);
  produtos.excluir(requisicao, resposta);
});

module.exports = router;