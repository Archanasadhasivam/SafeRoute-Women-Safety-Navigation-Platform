// ── Student Routes ────────────────────────────────────
// Defines all REST API endpoints for student management
// Each route is connected to its controller function
 
const express = require('express');
const router = express.Router();
 
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../Controller/userController');
 
// GET    /students       → Fetch all students
router.get('/', getAllStudents);
 
// POST   /students       → Add a new student
router.post('/', addStudent);
 
// PUT    /students/:id   → Update student by id
router.put('/:id', updateStudent);
 
// DELETE /students/:id   → Delete student by id
router.delete('/:id', deleteStudent);
 
module.exports = router; 
