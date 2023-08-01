import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student.js';
import bcrypt from 'bcrypt';

const createStudent = async (req: Request, res: Response) => {
	const { name, username, student_number, password } = req.body;
    
    const saltRounds = 10;
    
    const password_hash = await bcrypt.hash(password, saltRounds);

	const student = new Student({
		name,
		username,
		student_number,
        password_hash
	});

    const student_1 = await student.save();
    return res.status(201).json({ student_1 });
};

const getAllStudents = async (req: Request, res: Response) => {
    const students = await Student.find();
    res.status(200).json({ students });
};

const getStudentById = async (req: Request, res: Response) => {
	const studentID = req.params.studentID
    const student = await Student.findById(studentID);
    res.status(200).json({ student })
};

const updateStudentById = async (req: Request<{studentID: string}, {ReqBody: IStudent}>, res: Response) => {
	const studentID: string = req.params.studentID
    const updatedStudent = await Student.findByIdAndUpdate(studentID, req.body, { new: true });
    res.status(201).json({ updatedStudent })
};

const deleteStudentById = async (req: Request<{studentID: string}>, res: Response) => {
	const studentID: string = req.params.studentID
    await Student.findByIdAndDelete(studentID);
    res.status(204).end()
};



export default { createStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById };
