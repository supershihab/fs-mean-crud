'use strict';

//get express to use http verbs like get, put, post, delete
const express = require('express');
//create router object by calling the method Router() of express
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.model');

//to use get method, call it like router.get();
router.get('/', (req, res) => {
  //to align data with the database, first create a schema call the method find() of mongoose. So go and create a schema in the models folder
  //find will return an array of records
  Employee.find()
  .then(data => res.send(data))
  .catch(error => console.log(`💥 Data retrieval failed! - `, error));
});

router.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id) === false) {
    res.status(404).json({error: `Invalid id: ${req.params.id}`});
  } else {
    Employee.findById(req.params.id)
    .then(data => {
      if(data) {
        res.send(data)
      } else {
        res.status(404).json({error: `Data could not be found with id ${req.params.id}`});
      }
    })
    .catch(error => console.log(`💥 Data retrieval failed! - `, error));
  }
});

router.post('/', (req, res) => {
  Employee.create(req.body)
  .then(data => res.status(201).json(data))
  .catch(error => console.log(`💥 Data insertion failed! - `, error));
})


//export the router object in app entry point to see the result of these methods
module.exports = router;