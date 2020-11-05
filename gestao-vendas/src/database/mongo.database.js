const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

mongoose.connect(process.env.MONGODB, options)
  .then(() => console.log('vendas mongodb connected'))
  .catch((err) => console.log(err));