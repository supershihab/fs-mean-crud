'use strict';
const asyncHandler = require('express-async-handler');
const Employee = require('../models/employee.model');

//get all employees
const getAllEmployees = asyncHandler(async (req, res) =>{
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
    
  } catch (error) {
    res.status(404).json({message: error.message});    
  }
});

//get single employee
const getEmployeeById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
    
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

//update single employee
const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body);
    if (!employee) {
      res.status(400);
      throw new Error('Employee not found');
    }
    const updatedEmployee = await Employee.findById(id);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//delete Single employee
const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      res.status(400);
      throw new Error('Employee not found');
    }
    res.status(200).json(`Employee with id: ${id} deleted`);
    
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});


//create a single Employee
const createEmployee = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


module.exports = {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  createEmployee
};















// 'use strict';

// //get express to use http verbs like get, put, post, delete
// const express = require('express');
// //create router object by calling the method Router() of express
// const router = express.Router();
// const Employee = require('../models/employee.model');

// const recordNotFoundError = (req, res) => {
//   res.status(404)
//   .json({error: `Data could not be found with id: ${req.params.id}`});
// };

// //to use get method, call it like router.get();

// router.get('/', (req, res, next) => {
//   //to align data with the database, first create a schema call the method find() of mongoose. So go and create a schema in the models folder
//   //find will return an array of records
//   Employee.find({})
//   .then(data => res.send(data))
//   .catch(error => console.log(`💥 Data retrieval failed! - `));
// });

// router.get('/:id', (req, res, next) => {
//     Employee.findById(req.params.id)
//     .then(data => {
//       if(data) res.send(data)
//        else recordNotFoundError(req, res);
      
//     })
//     .catch(error => console.log(`💥 Data retrieval failed! with ID - `));
// });

// router.put('/:id', (req, res, next) => {
//     Employee.findByIdAndUpdate(req.params.id, req.body)
//     .then(data => {
//       if(data) res.send(data)
//       else recordNotFoundError(req, res);
//     })
//     .catch(error => console.log(`💥 Data Update failed! - `, error));
// });


// router.delete('/:id', (req, res) => {
//   Employee.findByIdAndDelete(req.params.id)
//   .then(data => {
//     if(data) res.send(data)
//     else recordNotFoundError(req, res);
//   })
//   .catch(error => console.log(`💥 Data Deletion failed! - `, error));
// });


// router.post('/', (req, res) => {
//   Employee.create(req.body)
//   .then(data => res.status(201).json(data))
//   .catch(error => console.log(`💥 Data insertion failed! - `, error));
// })


// //export the router object in app entry point to see the result of these methods
// module.exports = router;