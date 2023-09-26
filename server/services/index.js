'use strict';

exports.generateCrudMethods = Model => {
  return {
    getAll: () => Model.find(),
    getById: id => Model.findById(id),
    create: record => Model.create(record),
    updateById: (id, record) => Model.findByIdAndUpdate(id, record, { new: true }),

  }
}