const express = require('express');
const router = express.Router();
const vendas = require('../controllers/vendas.controller');

router.get('/', (requisicao, resposta) => {
  console.log('GET /vendas');
  vendas.listar(requisicao, resposta);
});

router.post('/', (requisicao, resposta) => {
  console.log('POST /vendas', requisicao.body);
  vendas.gerar(requisicao, resposta);
});

router.delete('/:id', (requisicao, resposta) => {
  console.log('DELETE /vendas', requisicao.params.id);
  vendas.cancelar(requisicao, resposta);
});

module.exports = router;