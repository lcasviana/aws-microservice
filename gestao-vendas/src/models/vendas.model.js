const mongoose = require('mongoose');
const { Schema } = mongoose;

const Vendas = new Schema({
  id: { type: String, required: true },
  valorReais: { type: Number, required: true },
  produtos: [{
    produtoId: { type: String, required: true },
    quantidade: { type: Number, required: true },
  }],
});

module.exports = mongoose.model('Vendas', Vendas);