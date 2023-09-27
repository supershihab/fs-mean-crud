'use strict';

const mongoose = require('mongoose');

const Employee = mongoose.model('Employee', {
  fullName: { type: String, required: true, },
  position: { type: String, required: true, },
  location: { type: String, required: true, },
  salary: { type: Number, required: true,},

}, 'employees');

module.exports = Employee;