import express from 'express';
import studentController from '../controllers/Student.js';

const studentRouter = express.Router();

studentRouter.get('/', studentController.getAllStudents);
// studentRouter.post('/', studentController.createStudent);
studentRouter.put('/:studentID', studentController.updateStudentById);
studentRouter.get('/:studentID', studentController.getStudentById);
studentRouter.delete('/:studentID', studentController.deleteStudentById)

export default studentRouter;
