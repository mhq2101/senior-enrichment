'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../../db/models');
const Student = models.Student;
module.exports = router;

router.get('/', function (req, res, next) {
  Student.findAll({ where: req.query })
  .then(students => res.json(students))
  .catch(next);
});

router.post('/', function (req, res, next) {
  Student.create(req.body)
  .then(student => res.status(201).json(student))
  .catch(next);
});

router.param('studentId', function (req, res, next, id) {
  Student.findById(id)
  .then(student => {
    if (!student) {
      const err = Error('student not found');
      err.status = 404;
      throw err
    }
    req.student = student;
    next();
    return null;
  })
  .catch(next);
});

router.get('/:studentId', function (req, res) {
  res.json(req.student);
});