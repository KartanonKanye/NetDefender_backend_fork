import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent {
	name: string;
	username: string;
	student_number?: string; // student_number is optional for now, as students may not want to get graded from game. This needs to be discussed further.
    password_hash: string;
	tutorial_completed: boolean;
	public_key: string;
	levels: [
        { id: number; completed: boolean; points: number; },
        { id: number; completed: boolean; points: number; },
        { id: number; completed: boolean; points: number; },
        { id: number; completed: boolean; points: number; },
        { id: number; completed: boolean; points: number; }
    ];
	rating: number;
}

export interface IStudentModel extends IStudent, Document {}

const levelsDefault =  [
        { id: 1, completed: false, points: 20 },
        { id: 2, completed: false, points: 20 },
        { id: 3, completed: false, points: 20 },
        { id: 4, completed: false, points: 20 },
        { id: 5, completed: false, points: 20 }
]

const StudentSchema: Schema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	student_number: { type: String, default: "" },
    password_hash: {type: String, required: true},
	tutorial_completed: { type: Boolean, default: false },
	public_key: { type: String },
	levels: { type: Array, default: levelsDefault},
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
