const dotenv = require('dotenv');
const express = require('express');
const ejs = require('ejs');
const app = express();

dotenv.config();
_ = require('./database/mongo.database');

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views/'));

const indexRoute = require('./routes/index.route');
const vendasRoute = require('./routes/vendas.route');
app.use('/', indexRoute);
app.use('/vendas', vendasRoute);
app.use((_, resposta) => resposta.status(404).send('...'));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`vendas port ${port}`));