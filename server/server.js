'use strict';
//module imoprts
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//local imports
const emploeeRoutes = require('./routes/employee.route');
const connectDB = require('./config/db');

//initialize application
const app = express();

//environment variables
const port = process.env.port || 3000;

//use middlewares
app.use(cors({origin:'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//use route middleware
app.use('/api/employees', emploeeRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found' });
});


connectDB()
.then(() => {
  console.log(`Database connected successfully!`);
  app.listen(port, () => {
    console.log(`Application started on port ${port}..`);
  });
})
.catch(error => console.log(error));

