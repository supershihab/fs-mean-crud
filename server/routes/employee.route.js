'use strict';

const express = require('express');
const router = express.Router();
const { getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, createEmployee } = require('../controllers/employee.controller');

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.post('/', createEmployee);

module.exports = router;