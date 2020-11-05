const mongoose = require('mongoose');
const { Schema } = mongoose;

const Produtos = new Schema({
  id: { type: String, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  categoria: { type: String, required: true }, 
  valorReais: { type: Number, required: true },
});

module.exports = mongoose.model('Produtos', Produtos);