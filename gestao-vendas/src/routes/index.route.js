const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (requisicao, resposta) => {
  console.log(`${requisicao.method} ${requisicao.url}`);
  resposta.sendFile(path.resolve('views/index.html'));
});

module.exports = router;