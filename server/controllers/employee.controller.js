'use strict';

//get express to use http verbs like get, put, post, delete
const express = require('express');
//create router object by calling the method Router() of express
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.model');
const { generateCrudMethods } = require('../services/index.js');
const employeeCrudMethods = generateCrudMethods(Employee);
const { validateDBID, recordNotFoundError } = require('../middlewares/index.js');

//to use get method, call it like router.get();

router.get('/', (req, res, next) => {
  //to align data with the database, first create a schema call the method find() of mongoose. So go and create a schema in the models folder
  //find will return an array of records
  employeeCrudMethods.getAll()
  .then(data => res.send(data))
  .catch(error => next(error));
  // .catch(error => console.log(`💥 Data retrieval failed! - `, error));
});

router.get('/:id', validateDBID, (req, res, next) => {
    employeeCrudMethods.getById(req.params.id)
    .then(data => {
      if(data) res.send(data)
       else recordNotFoundError(req, res);
      
    })
    .catch(error => next(error));
});

router.put('/:id', validateDBID, (req, res, next) => {
    employeeCrudMethods.update(req.params.id, req.body)
    .then(data => {
      if(data) res.send(data)
      else recordNotFoundError(req, res);
    })
    .catch(error => next(error));
});


router.delete('/:id', validateDBID, (req, res) => {
  employeeCrudMethods.delete(req.params.id)
  .then(data => {
    if(data) res.send(data)
    else recordNotFoundError(req, res);
  })
  .catch(error => next(error));
});


router.post('/', (req, res) => {
  employeeCrudMethods.create(req.body)
  .then(data => res.status(201).json(data))
  .catch(error => console.log(`💥 Data insertion failed! - `, error));
})


//export the router object in app entry point to see the result of these methods
module.exports = router;