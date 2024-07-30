const { application } = require('express');
const mongoose = require('mongoose');

// define person schema 
const personSchema = new mongoose.Schema({
    name: {
      type:  String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    work:{
      type: String,
      enum: ['manager','chef','waiter'],
      required:true
    },
    mobile: {
      type : String,
      required:true
    },
    email: {
     type: String,
     required: true,
     unique: true
    },
    address:{
    type: String, 
    },
    salary:{
      type: Number,
      required:true
    } 
})



// create person model
const person = mongoose.model('person',personSchema);
module.exports= person;
