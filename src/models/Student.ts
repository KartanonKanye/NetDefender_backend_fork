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
			{ id: string; completed: boolean; points: number; name: string },
			{ id: string; completed: boolean; points: number; name: string }
		],
		[{ id: string; completed: boolean; points: number; name: string }],
		[{ id: string; completed: boolean; points: number; name: string }],
		[{ id: string; completed: boolean; points: number; name: string }],
		[{ id: string; completed: boolean; points: number; name: string }]
	];
	rating: number;
	points: number;
}

export interface IStudentModel extends IStudent, Document {}

const levelsDefault = [
	[
		{ id: 'quiz1', completed: false, points: 10, name: 'Quiz: Identify Attacks' },
		{ id: 'flashcards1-attacks', completed: false, points: 10, name: 'Flashcards: Attack Types' },
		{ id: 'flashcards1-crypto', completed: false, points: 10, name: 'Flashcards: Cryptography' },
		{ id: 'task1', completed: false, points: 50, name: 'Level 1: Caesar Cipher' }
	],
	[
		{ id: 'quiz2', completed: false, points: 10, name: 'Quiz: Packet Routing and Integrity' },
		{ id: 'flashcards2-packets', completed: false, points: 5, name: 'Flashcards: Packet Routing' },
		{ id: 'flashcards2-crypto', completed: false, points: 10, name: 'Flashcards: Asymmetric Cryptography' },
		{ id: 'flashcards2-integrity', completed: false, points: 5, name: 'Flashcards: Message Integrity' },
		{ id: 'taskDjikstra', completed: false, points: 10, name: 'Djikstra Exercise' },
		{ id: 'task2', completed: false, points: 50, name: 'Level 2: RSA Encryption' }
  ],
	[
		{ id: 'quiz3', completed: false, points: 10, name: 'Quiz: Authentication' },
		{ id: 'flashcards3-digital', completed: false, points: 10, name: 'Flashcards: Digital Signatures' },
		{ id: 'flashcards3-auth', completed: false, points: 10, name: 'Flashcards: End-point Authentication' },
		{ id: 'task3', completed: false, points: 50, name: 'Level 3: Incidence Response' }
  ],
	[
		{ id: 'quiz4', completed: false, points: 10, name: 'Quiz: Security' },
		{ id: 'flashcards4-email', completed: false, points: 10, name: 'Flashcards: Securing Email' },
		{ id: 'flashcards4-tcp', completed: false, points: 10, name: 'Flashcards: Securing TCP' },
		{ id: 'task4', completed: false, points: 50, name: 'Level 4: Respond to Email' }
  ],
	[
		{ id: 'quiz5', completed: false, points: 10, name: 'Quiz: IPSec' },
		{ id: 'flashcards5-ipsec', completed: false, points: 10, name: 'Flashcards: IPSec' },
		{ id: 'flashcards5-vpn', completed: false, points: 10, name: 'Flashcards: VPN' },
		{ id: 'task5', completed: false, points: 50, name: 'Level 5: Capture the Flag' }
  ]
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
	points: { type: Number, default: 0 },
  course_student: { type: Boolean, default: true }
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
