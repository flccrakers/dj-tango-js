'use strict';
let path = require('path');
let mime = require('mime');
let fs = require('fs');

let mongoose, Tango;
mongoose = require('mongoose');
Tango = mongoose.model('Tangos');


exports.list_all_tangos = function (req, res) {
  Tango.find({}, function (err, tangos) {
    if (err)
      res.send(err);
    res.json(tangos);
  });
};

exports.create_a_tango = function (req, res) {
  let new_tango = new Tango(req.body);
  new_tango.save(function (err, tango) {
    if (err)
      res.send(err);
    res.json(tango);
  });
};


exports.get_a_tango = function (req, res) {
  Tango.findById(req.params.tangoId, function (err, tango) {
    if (err)
      res.send(err);
    res.json(tango);
  });
};


exports.update_a_tango = function (req, res) {
  Tango.findOneAndUpdate({_id: req.params.tangoId}, req.body, {new: true}, function (err, tango) {
    if (err)
      res.send(err);
    res.json(tango);
  });
};

exports.delete_a_tango = function (req, res) {
  // noinspection JSUnusedLocalSymbols
  Tango.remove({
    _id: req.params.tangoId
  }, function (err, tango) {
    if (err) res.send(err);
    res.json({message: 'Tango successfully deleted'});
  });
};

exports.delete_all_tangos = function (req, res) {
  // noinspection JSUnusedLocalSymbols
  Tango.remove(
    {},
    function (err, tango) {
      if (err) res.send(err);
      res.json({message: 'All tango deleted'});
    }
  );
};


exports.download = function (req, res) {
  Tango.findById(req.params.tangoId, function (err, tango) {
    // console.log(res.header);
    if (err)
      res.send(err);

    console.log(tango.path);
    // let baseName = '/home/hoonakker/Dropbox/dvt/projet-JAVASCRIPT/react-tutos/dj-tango-js/dataserver';
    // let curFile = baseName + '/tango/TANGO/FRANCISCO CANARO/0-La Melodia De Nuestro Adios-FRANCISCO CANARO-UNKNOWN-TANGO.mp3';
    let curFile = tango.path;
    let mimeType = mime.lookup(curFile);
    let filename = path.basename(curFile);
    let stat = fs.statSync(curFile);
    console.log(filename);
    console.log(mimeType);
    console.log(stat.size);
    res.set('Content-disposition', 'attachment; filename=' + filename);
    res.set('Content-type', mimeType);
    res.download(curFile);
  });
};

