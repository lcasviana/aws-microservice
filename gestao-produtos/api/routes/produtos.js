module.exports = app => {
  const controller = app.controllers.produtos;

  app.route('/api/v1/produtos')
    .get(controller.listProdutos)
    .post(controller.saveProdutos);

  app.route('/api/v1/produtos/:id')
    .get(controller.listProduto)
    .delete(controller.removeProdutos)
    .put(controller.updateProdutos);
}