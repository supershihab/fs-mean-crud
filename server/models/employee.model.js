'use strict';

const mongoose = require('mongoose');
//create a model, params: name of the model, schema as object, name of the collection
module.exports = mongoose.model('Employee', {
  fullName: {type: String},
  position: {type: String},
  location: {type: String},
  salary: {type: Number},
}, 'employees');

//we don't need to explicitly give the 3rd method for the database collection, if we use the 1st param correctly, mongoose will choose the plural word of the 1st param automatically.

//we're exporting the model as default since there is only one model here

//now go back to employee.controller.js write the first get action, don't forget to import this file over in employee.controller.js first!