const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// _ = require('./database/mongo.database');

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views/'));

const vendas = require('./routes/vendas.route');
app.use('/vendas', vendas);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`vendas port ${port}`));