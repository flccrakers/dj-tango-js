'use strict';

let mongoose, Milonga;
mongoose = require('mongoose');
Milonga = mongoose.model('Milongas');

exports.list_all_milonga = function (req, res) {
  Milonga.find({}, function (err, milongas) {
    if (err)
      res.send(err);
    res.json(milongas);
  });
};

exports.create_a_milonga = function (req, res) {
  let new_milonga = new Milonga(req.body);
  new_milonga.save(function (err, milonga) {
    if (err)
      res.send(err);
    res.json(milonga);
  });
};


exports.get_a_milonga = function (req, res) {
  console.log(req.params);
  Milonga.findById(req.params.milongaId, function (err, milonga) {
    if (err)
      res.send(err);
    res.json(milonga);
  });
};


exports.update_a_milonga = function (req, res) {
  Milonga.findOneAndUpdate({_id: req.params.milongaId}, req.body, {new: true}, function (err, milonga) {
    if (err)
      res.send(err);
    res.json(milonga);
  });
};

exports.delete_a_milonga = function (req, res) {
  Milonga.remove({
    _id: req.params.milongaId
  }, function (err, milonga) {
    if (err)
      res.send(err);
    res.json({message: 'Milonga successfully deleted'});
  });
};
