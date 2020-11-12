//index.js
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const produtosProxy = httpProxy('http://localhost:3001');
const vendasProxy = httpProxy('http://localhost:3002');

// Proxy request

// Produtos Routes  
app.get('/api/v1/produtos', (req, res, next) => {
    produtosProxy(req, res, next);
})

app.post('/api/v1/produtos', (req, res, next) => {
    produtosProxy(req, res, next);
})


app.get('/api/v1/produtos/:id', (req, res, next) => {
    produtosProxy(req, res, next);
})

app.delete('/api/v1/produtos/:id', (req, res, next) => {
    produtosProxy(req, res, next);
})

app.put('/api/v1/produtos/:id', (req, res, next) => {
    produtosProxy(req, res, next);
})


// Vendas Routes  
app.get('/api/v1/vendas', (req, res, next) => {
    vendasProxy(req, res, next);
})

app.post('/api/v1/vendas', (req, res, next) => {
    vendasProxy(req, res, next);
})

app.delete('/api/v1/vendas/:id', (req, res, next) => {
    vendasProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);