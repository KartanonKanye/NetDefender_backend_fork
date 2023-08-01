import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent {
	name: string;
	username: string;
	student_number: string;
    password_hash: string;
	tutorial_completed: boolean;
	public_key: string;
	levels_completed: number;
	rating: number;
}

export interface IStudentModel extends IStudent, Document {}

const StudentSchema: Schema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	student_number: { type: String, required: true },
    password_hash: {type: String, required: true},
	tutorial_completed: { type: Boolean, default: false },
	public_key: { type: String },
	levels_completed: { type: Number, default: 0 },
	rating: { type: Number, default: 0 }
});

StudentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
        // do not reveal password_hash
        delete returnedObject.password_hash
	}
})

export default mongoose.model<IStudentModel>('Student', StudentSchema);
