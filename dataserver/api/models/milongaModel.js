'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let MilongaSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the Milonga',
    unique:true,
  },
  tangos:{
    type:[{
      type:String,
    }],
    default:['0']
  }
});

module.exports = mongoose.model('Milongas', MilongaSchema);