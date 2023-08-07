import express from 'express';
import studentController from '../controllers/Student.js';

const signupRouter = express.Router();

signupRouter.post('/', studentController.createStudent);

export default signupRouter;
