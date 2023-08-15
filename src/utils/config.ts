import 'dotenv/config';

const PORT: string = process.env.PORT || '5050';
const MONGODB_URI: string = process.env.MONGODB_URI || '';
const SECRET: string = process.env.SECRET || 'asdf';

export default {
	MONGODB_URI,
	PORT,
    SECRET
};
