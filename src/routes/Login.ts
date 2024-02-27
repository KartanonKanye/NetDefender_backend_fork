import express from 'express';
import LoginStudent from '../controllers/Login.js';

const loginRouter = express.Router();

loginRouter.post('/', LoginStudent);

export default loginRouter;
