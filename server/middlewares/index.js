'use strict';
const ObjectId = require('mongoose').Types.ObjectId;

const validateDBID = (req, res, next) => {
  if (ObjectId.isValid(req.params.id) === false) {
    res.status(404).json({error: `Invalid id: ${req.params.id}`});
  } else {
    next();
  }
};

const recordNotFoundError = (req, res) => {
  res.status(404)
  .json({error: `Data could not be found with id: ${req.params.id}`});
};

const errorHandler = (error, res, req, next) => {
  res.status(500)
  .json({error: error.message});
}

module.exports = {
  validateDBID,
  recordNotFoundError,
  errorHandler,
};