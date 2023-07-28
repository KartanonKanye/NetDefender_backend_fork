import express from 'express';
import messageController from '../controllers/Message.js';

const messageRouter = express.Router();

messageRouter.get('/', messageController.getAllMessages);
messageRouter.post('/', messageController.createMessage);
messageRouter.put('/:studentID', messageController.updateMessageById);
messageRouter.get('/:studentID', messageController.getMessageById);
messageRouter.delete('/:studentID', messageController.deleteMessageById)

export default messageRouter;
