import express from 'express';
import studentController from '../controllers/Student.js';

const studentRouter = express.Router();

studentRouter.get('/', studentController.getStudents);
studentRouter.post('/create', studentController.createStudent);

export default studentRouter;
