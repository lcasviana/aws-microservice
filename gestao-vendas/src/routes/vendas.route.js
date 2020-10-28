const express = require('express');
const router = express.Router();
const vendas = require('../controllers/vendas.controller');

router.get('/', (requisicao, resposta) => {
  console.log('GET /vendas', requisicao, resposta);
  vendas.listar(requisicao, resposta);
});

router.post('/', (requisicao, resposta) => {
  console.log('POST /vendas', requisicao, resposta);
  vendas.gerar(requisicao, resposta);
});

router.delete('/:id', (requisicao, resposta) => {
  console.log('DELETE /vendas', requisicao, resposta);
  vendas.cancelar(requisicao, resposta);
});

module.exports = router;