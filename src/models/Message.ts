import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
	heading: string;
	sender: { email: string; name: string };
	receiver: { email: string; name: string };
	message: string;
}

export interface IMessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema({
	heading: { type: String, required: true },
	sender: { type: Object, required: true },
	receiver: { type: Object, required: true },
	message: { type: String, required: true }
});

MessageSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

export default mongoose.model<IMessageModel>('Message', MessageSchema);
