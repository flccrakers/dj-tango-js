'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let TangoSchema = new Schema({
  path: {type: String, required: true, unique: true,},
  title: {type: String},
  artist: {type: String, default: 'Unknown'},
  singer: {type: String, default: 'Unknown'},
  composer: {type: String, default: 'Unknown'},
  author: {type: String, default: 'Unknown'},
  album: {type: String, default: 'Unknown'},
  year: {type: Number, default: 0},
  bpmHuman: {type: Number, default: 0},
  bpmFromFile: {type: Number, default: 0},
  duration: {type: Number, default: 0},
  start: {type: Number, default: 0},
  end: {type: Number, default: 0},
  oldId:{type:Number},
  genre:{type:String, default:'Unknown'},
  fileSize:{type:Number}


});


module.exports = mongoose.model('Tangos', TangoSchema);