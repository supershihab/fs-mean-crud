'use strict'

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./controllers/employee.controller');

let app = express();

//middlewares
app.use(bodyParser.json())
//configure routing for the application, always put / at the begining of a route and nothing at the end of the route, on your router file add the following / only, so the route becomes 'localhost:5038/api/employees/' to get all existing data
app.use('/api/employees', employeeRoutes);
app.use('/api/employee/:id', employeeRoutes);
app.use('/api/search', employeeRoutes);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log('¯\_(ツ)_/¯ Database connected successfully!');
    app.listen(port, () =>{
      console.log(`( •_•)>⌐■-■ Application running on port ${port} (⌐■_■) `);
    });
  })
  .catch(error => console.log(`(⊙_⊙;) Database connection error: ${error} ಠ_ಠ `));