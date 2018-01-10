'use strict';
module.exports = function (app) {
  let milongas = require('../controllers/milongaControler');

  // milongas Routes
  app.route('/milongas')
    .get(milongas.list_all_milonga)
    .post(milongas.create_a_milonga);

  app.route('/milongas/:milongaId')
    .get(milongas.get_a_milonga)
    .put(milongas.update_a_milonga)
    .delete(milongas.delete_a_milonga);
};