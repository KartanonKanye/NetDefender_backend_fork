import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Student from '../models/Student.js';

const createStudent = (req: Request, res: Response, next: NextFunction) => {
	const { name, username, student_number } = req.body;

	const student = new Student({
		name,
		username,
		student_number
	});

	return student
		.save()
		.then((student) => res.status(201).json({ student }))
		.catch((error) => res.status(500).json({ error }));
};

const getStudents = (req: Request, res: Response, next: NextFunction) => {
	return Student.find()
		.then((students) => {
			res.status(200).json({ students });
		})
		.catch((error) => res.status(500).json({ error }));
};

export default { createStudent, getStudents };
