// ── Student Controller ────────────────────────────────
// Contains all CRUD operation logic
// Each function handles one API endpoint
 
const students = require('../model/userModel');
 
// ── GET /students → Fetch all students ───────────────
const getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Students fetched successfully',
    total: students.length,
    data: students,
  });
};
 
// ── POST /students → Add a new student ───────────────
const addStudent = (req, res) => {
  const { name, age, department, email } = req.body;
 
  // Validation
  if (!name || !age || !department || !email) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: name, age, department, email',
    });
  }
 
  // Create new student with auto-incremented id
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    age,
    department,
    email,
  };
 
  students.push(newStudent);
 
  res.status(201).json({
    success: true,
    message: 'Student added successfully',
    data: newStudent,
  });
};
 
// ── PUT /students/:id → Update student details ────────
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, department, email } = req.body;
 
  // Find student index
  const index = students.findIndex((s) => s.id === id);
 
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`,
    });
  }
 
  // Update only the fields that are provided
  if (name)       students[index].name       = name;
  if (age)        students[index].age        = age;
  if (department) students[index].department = department;
  if (email)      students[index].email      = email;
 
  res.status(200).json({
    success: true,
    message: `Student with id ${id} updated successfully`,
    data: students[index],
  });
};
 
// ── DELETE /students/:id → Delete a student ───────────
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
 
  // Find student index
  const index = students.findIndex((s) => s.id === id);
 
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${id} not found`,
    });
  }
 
  // Remove student from array
  const deletedStudent = students.splice(index, 1);
 
  res.status(200).json({
    success: true,
    message: `Student with id ${id} deleted successfully`,
    data: deletedStudent[0],
  });
};
 
module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
  
