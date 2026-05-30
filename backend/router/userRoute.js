'use strict';

const express = require('express');
const path = require('path');

// path.join guarantees the correct separator on every OS;
// all lowercase folder name eliminates Linux case-sensitivity failures.
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require(path.join(__dirname, '..', 'controller', 'userController'));

const router = express.Router();

// GET /students  — full list (supports both /students and /students/all)
router.get('/',    getAllStudents);
router.get('/all', getAllStudents);

// POST /students — create a new student record
router.post('/', addStudent);

// PUT  /students/:id — update by id
router.put('/:id', updateStudent);

// DELETE /students/:id — remove by id
router.delete('/:id', deleteStudent);

module.exports = router;