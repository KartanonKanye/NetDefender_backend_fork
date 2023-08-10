import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student.js';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../utils/config.js';
import Logger from '../utils/Logger.js';

interface ICreateStudent {
    name: string;
    username: string;
    student_number: string;
    password: string;
}

const getTokenFrom = (req: Request) => {
    const auth: string | undefined = req.get('Authorization');

    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '');
    }

    return null;
}

const createStudent = async (req: Request<{ReqBody: ICreateStudent}>, res: Response) => {
	const { name, username, student_number, password } = req.body;
    Logger.log(`Request Body: {${name}, ${username}, ${student_number}, ${password}}`)
    
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
    const token = getTokenFrom(req)
    
    if (token === null) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload
    
    if (!decodedToken.id) {
        return res.status(401).json({error: 'Token invalid'})
    }
    else if (decodedToken.id !== studentID) {
        return res.status(401).json({error: 'Unauthorized user'})
    }

    const student = await Student.findById(decodedToken.id);
    return res.status(200).json({ student })
};

const updateStudentById = async (req: Request<{studentID: string}, {ReqBody: IStudent}>, res: Response) => {
	const studentID: string = req.params.studentID
    
    const token = getTokenFrom(req)
    
    if (token === null) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload
    
    if (!decodedToken.id) {
        return res.status(401).json({error: 'Token invalid'})
    }
    else if (decodedToken.id !== studentID) {
        return res.status(401).json({error: 'Unauthorized user'})
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentID, req.body, { new: true });
    return res.status(201).json({ updatedStudent })
};

const deleteStudentById = async (req: Request<{studentID: string}>, res: Response) => {
	const studentID: string = req.params.studentID
    
    const token = getTokenFrom(req)
    
    if (token === null) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload
    
    if (!decodedToken.id) {
        return res.status(401).json({error: 'Token invalid'})
    }
    else if (decodedToken.id !== studentID || studentID !== "admin") {
        return res.status(401).json({error: 'Unauthorized user'})
    }

    await Student.findByIdAndDelete(studentID);
    res.status(204).end()
};



export default { createStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById };
