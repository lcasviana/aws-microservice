const express = require('express');
const router = express.Router();
const vendas = require('../controllers/vendas.controller');

router.get('/', (requisicao, resposta) => {
  vendas.listar(requisicao, resposta);
});

router.post('/', (requisicao, resposta) => {
  vendas.gerar(requisicao, resposta);
});

router.delete('/:id', (requisicao, resposta) => {
  vendas.cancelar(requisicao, resposta);
});

module.exports = router;