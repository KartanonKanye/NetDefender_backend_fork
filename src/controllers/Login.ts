import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Student from '../models/Student.js';
import config from '../utils/config.js';

const LoginStudent = async (req: Request, res: Response) => {
    const {username, password} = req.body

    const user = await Student.findOne({username})
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password_hash)

    if (!(user && passwordCorrect)){
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    } 

    const token = jwt.sign(userForToken, config.SECRET)

    res.status(200).send({token, username: user.username, name: user.name})
}

export default LoginStudent
