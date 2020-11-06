const dotenv = require('dotenv');
const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');

dotenv.config();
_ = require('./database/mongo.database');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index.route');
const vendasRoute = require('./routes/vendas.route');
app.use('/', indexRoute);
app.use('/api/v1/vendas', vendasRoute);
app.use((requisicao, resposta) =>
  resposta.status(404).send(`${requisicao.method} ${requisicao.url}`));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`vendas port ${port}`));