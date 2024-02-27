import 'dotenv/config';

const PORT: string = process.env.PORT || '5050';
const MONGODB_URI: string = process.env.MONGODB_URI || '';
const SECRET: string = process.env.SECRET || 'asdf';
const ADMIN: string = process.env.ADMIN || '';

export default {
	MONGODB_URI,
	PORT,
	SECRET,
	ADMIN
};
