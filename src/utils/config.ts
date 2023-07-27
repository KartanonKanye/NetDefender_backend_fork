import 'dotenv/config';

const PORT: string = process.env.PORT || '12345';
const MONGODB_URI: string = process.env.MONGODB_URI || '';

export default {
	MONGODB_URI,
	PORT
};
