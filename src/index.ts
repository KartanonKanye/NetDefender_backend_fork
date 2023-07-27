import express, { Request, Response, NextFunction } from 'express';
import app from './app.js';
import config from './utils/config.js';
import Logger from './utils/Logger.js';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRouter from './routes/Student.js';

mongoose
	.connect(config.MONGODB_URI, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logger.info('Mongo connected successfully');
		startServer();
	})
	.catch((error) => Logger.error(error));

// start server only if Mongoose connects
const startServer = () => {
	// Log the request
	app.use((req: Request, res: Response, next: NextFunction) => {
		Logger.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on('finish', () => {
			// Log the Response
			Logger.info(
				`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
			);
		});

		next();
	});

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	/** Rules of our API */
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

		if (req.method == 'OPTIONS') {
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).json({});
		}

		next();
	});

	/** Routes */
	app.use('/students', studentRouter);
	// app.use('/books', bookRoutes);

	/** Healthcheck */
	// app.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

	/** Error handling */
	app.use((req, res, next) => {
		const error = new Error('Not found');

		Logger.error(error);

		res.status(404).json({
			message: error.message
		});
	});

	app.listen(config.PORT, () => {
		Logger.info(`Server up and running on http::/localhost:${config.PORT}`);
	});
};
