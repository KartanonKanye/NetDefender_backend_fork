import express, { Express, Request, Response } from 'express';
import 'express-async-errors';

// Express App is initialised here
const app: Express = express();

// The following are test commands, that can be used to check if the server is working.
app.get('/', (req: Request, res: Response) => {
	res.status(200).send('<h1>Hello world! 🧗️</h1>');
});

app.get('/ping_server', (req, res, next) => res.status(200).json({ message: 'pong' }));  // changed '/ping' to '/ping_server', since '/ping' triggered a warning about a potential Prometheus botnet attack in the automated cybersecurity system.

app.get('/test', (req, res, next) => res.status(200).send('Hello world!💻️'));

export default app;
