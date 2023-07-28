import { NextFunction, Request, Response } from 'express';
import Message, { IMessage } from '../models/Message.js';

const createMessage = (req: Request<{ReqBody: IMessage}>, res: Response, next: NextFunction) => {
	const { heading, sender, receiver, message } = req.body;

	const student = new Message({
		heading,
		sender,
		receiver,
		message
	});

	return student
		.save()
		.then(message => res.status(201).json({ message }))
		.catch(error => res.status(500).json({ error }));
};

const getAllMessages = (req: Request, res: Response, next: NextFunction) => {
	return Message.find()
		.then(messages => {
			res.status(200).json({ messages });
		})
		.catch(error => res.status(500).json({ error }));
};

const getMessageById = (req: Request, res: Response, next: NextFunction) => {
	const messageID = req.params.messageID

	return Message.findById(messageID)
		.then(message => {
			message
			? res.status(200).json({ message })
			: res.status(404).json({message: "messageID not found in database"})
		})
		.catch(error => res.status(500).json({ error }));
};

const updateMessageById = (req: Request<{messageID: string}, {ReqBody: IMessage}>, res: Response, next: NextFunction) => {
	const messageID: string = req.params.messageID

	return Message.findByIdAndUpdate(messageID, req.body, {new: true})
		.then(updatedMessage => {
			updatedMessage 
			? res.status(201).json({ updatedMessage })
			: res.status(404).json({message: "messageID not found in database"})
		})
		.catch(error => res.status(500).json({ error }));
};

const deleteMessageById = (req: Request<{messageID: string}>, res: Response, next: NextFunction) => {
	const messageID: string = req.params.messageID

	return Message.findByIdAndDelete(messageID)
		.then(message => {
			message
			? res.status(204).end()
			: res.status(404).json({message: "messageID not found in database"})
		})
		.catch(error => res.status(500).json({ error }));
};



export default { createMessage, getAllMessages, getMessageById, updateMessageById, deleteMessageById };
