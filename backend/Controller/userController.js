// ── Student Controller ────────────────────────────────
// CRUD operations using MongoDB + Mongoose
// As taught by teacher: User.create, User.find, User.findByIdAndUpdate, User.findByIdAndDelete
 
const User = require('../model/userModel');
 
// ── GET /students → Fetch all students ───────────────
const getAllStudents = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      total: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching students',
      error: error.message,
    });
  }
};
 
// ── POST /students → Add a new student ───────────────
const addStudent = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: user,
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while adding student',
      error: error.message,
    });
  }
};
 
// ── PUT /students/:id → Update student ───────────────
const updateStudent = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Student with id ${req.params.id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating student',
      error: error.message,
    });
  }
};
 
// ── DELETE /students/:id → Delete student ────────────
const deleteStudent = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Student with id ${req.params.id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting student',
      error: error.message,
    });
  }
};
 
module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};


