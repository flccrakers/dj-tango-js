'use strict';

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

exports.download=function(req,res){
  Tango.findById(req.params.tangoId, function(err, tango){
    // console.log(res.header);
    if(err)
      res.send(err);
    //let stat = fileSystem.statSync(tango.path);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': tango.fileSize,
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Credentials' : true,
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Cache-Control': 'public, max-age=0',
      'Connection': 'keep-alive',
      'Content-Disposition': "attachment; filename=\"1979-Boys Don't Cry-THE CURE-UNKNOWN-CORTINA.mp3\"",
      'Vary': 'Origin',
      'X-Powered-By': 'Express',
    });
    res.download(tango.path);
  });
};

