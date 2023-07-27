import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Student, { IStudent } from '../models/Student.js';

const createStudent = (req: Request, res: Response, next: NextFunction) => {
	const { name, username, student_number } = req.body;

	const student = new Student({
		name,
		username,
		student_number
	});

	return student
		.save()
		.then(student => res.status(201).json({ student }))
		.catch(error => res.status(500).json({ error }));
};

const getAllStudents = (req: Request, res: Response, next: NextFunction) => {
	return Student.find()
		.then(students => {
			res.status(200).json({ students });
		})
		.catch(error => res.status(500).json({ error }));
};

const getStudentById = (req: Request, res: Response, next: NextFunction) => {
	const studentID = req.params.studentID

	return Student.findById(studentID)
		.then(student => {
			student 
			? res.status(200).json({ student })
			: res.status(404).json({message: "studentID not found in database"})
		})
		.catch(error => res.status(500).json({ error }));
};

const updateStudentById = (req: Request<{studentID: string}, {ReqBody: IStudent}>, res: Response, next: NextFunction) => {
	const studentID: string = req.params.studentID

	return Student.findByIdAndUpdate(studentID, req.body, {new: true})
		.then(updatedStudent => {
			updatedStudent 
			? res.status(201).json({ updatedStudent })
			: res.status(404).json({message: "studentID not found in database"})
		})
		.catch(error => res.status(500).json({ error }));
};

const deleteStudentById = (req: Request<{studentID: string}>, res: Response, next: NextFunction) => {
	const studentID: string = req.params.studentID

	return Student.findByIdAndDelete(studentID)
		.then(student => {
			student 
			? res.status(204).end()
			: res.status(404).json({message: "studentID not found in database"})
		})
		.catch(error => res.status(500).json({ error }));
};



export default { createStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById };
