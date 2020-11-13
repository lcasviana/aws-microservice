const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

mongoose.connect(`mongodb+srv://lcasviana:Mf3YdA7t4XBTYDD@todo-lists-cluster.5wi00.gcp.mongodb.net/todo-lists?retryWrites=true&w=majority`, options)
  .then(() => console.log('vendas mongodb connected'))
  .catch((err) => console.log(err));