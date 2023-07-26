import mongoose, { Document, Schema } from 'mongoose';

interface IStudent {
	name: string;
	username: string;
	student_number: string;
	tutorial_completed: boolean;
	public_key: string;
	levels_completed: number;
	rating: number;
}

interface IStudentModel extends IStudent, Document {}

const StudentSchema: Schema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	student_number: { type: String, required: true },
	tutorial_completed: { type: Boolean, default: false },
	public_key: { type: String },
	levels_completed: { type: Number, default: 0 },
	rating: { type: Number, default: 0 }
});

export default mongoose.model<IStudentModel>('Student', StudentSchema);
