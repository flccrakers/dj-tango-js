'use strict';
module.exports = function (app) {
  let tangos = require('../controllers/tangoControler');

  // tango Routes
  app.route('/tangos')
    .get(tangos.list_all_tangos)
    .post(tangos.create_a_tango)
    .delete(tangos.delete_all_tangos);

  app.route('/tangos/:tangoId')
    .get(tangos.get_a_tango)
    .put(tangos.update_a_tango)
    .delete(tangos.delete_a_tango);

  app.route('/tangos/download/:tangoId')
    .get(tangos.download);


};