import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
	// res.status(200).send({
	//   hello: '👨‍💻️'
	// })
	res.status(200).send('<h1>Hello world! 🧗️</h1>');
});

app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

app.get('/test', (req, res, next) => res.status(200).send('Hello world!💻️'));

export default app;
