const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (_, resposta) => {
  resposta.sendFile(path.resolve('views/index.html'));
});

module.exports = router;