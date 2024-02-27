import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent {
	name: string;
	username: string;
	student_number?: string; // student_number is optional for now, as students may not want to get graded from game. This needs to be discussed further.
	password_hash: string;
	tutorial_completed: boolean;
	public_key: string;
	levels: [
		[
			{ id: number; completed: boolean; points: number; name: string },
			{ id: number; completed: boolean; points: number; name: string }
		],
		[{ id: number; completed: boolean; points: number; name: string }],
		[{ id: number; completed: boolean; points: number; name: string }],
		[{ id: number; completed: boolean; points: number; name: string }],
		[{ id: number; completed: boolean; points: number; name: string }]
	];
	rating: number;
	points: number;
}

export interface IStudentModel extends IStudent, Document {}

const levelsDefault = [
	[{ id: 1, completed: false, points: 10, name: 'Level 1: Identify Attacks' }],
	[{ id: 2, completed: false, points: 10, name: 'Level 2: Caesar Cipher' }],
	[{ id: 3, completed: false, points: 20, name: 'Level 3: RSA encryption' }],
	[{ id: 4, completed: false, points: 20, name: 'Level 4: Web of Trust' }],
	[{ id: 5, completed: false, points: 20, name: 'Level 5: Capture the flag' }]
];

const StudentSchema: Schema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	student_number: { type: String, default: '' },
	password_hash: { type: String, required: true },
	tutorial_completed: { type: Boolean, default: false },
	public_key: { type: String },
	levels: { type: Array, default: levelsDefault },
	rating: { type: Number, default: 0 },
	points: { type: Number, default: 0 }
});

StudentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// do not reveal password_hash
		delete returnedObject.password_hash;
	}
});

export default mongoose.model<IStudentModel>('Student', StudentSchema);
