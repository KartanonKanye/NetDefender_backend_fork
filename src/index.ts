import express, { Request, Response, NextFunction } from 'express';
import app from './app.js';
import config from './utils/config.js';
import Logger from './utils/Logger.js';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRouter from './routes/Student.js';
import messageRouter from './routes/Message.js';
import loginRouter from './routes/Login.js';
import signupRouter from './routes/Signup.js';

// The app first tries to establish a connection to the MongoDB database. 
// If this is successful, it starts the server via the startServer method.
// else, it logs the error that was encountered.

mongoose
	.connect(config.MONGODB_URI, { retryWrites: true, w: 'majority' })
	.then(() => {
		Logger.info('Mongo connected successfully');
		startServer();
	})
	.catch((error) => Logger.error(error));

// start server only if Mongoose connects
const startServer = () => {
    // Allow CORS on the server
    // TODO: change this to incorporate a whitelist, so that only select domains can access this server.
    app.use(cors());
	// Log any request made to the server
	app.use((req: Request, res: Response, next: NextFunction) => {
		Logger.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on('finish', () => {
			// Log the Response from the server
			Logger.info(
				`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
			);
		});

		next();
	});

	app.use(express.urlencoded({ extended: true }));
    app.use(express.json());  // allow json parsing and stringify

	/** Rules of our API */
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

		if (req.method == 'OPTIONS') {
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).json({});
		}

		next();
	});

	/** Routes */
    // When making a call to the API, the base url that will be accessed is https://netdefender.org.aalto.fi/api
    // These will be the routes after '/api'
	app.use('/students', studentRouter);
	app.use('/messages', messageRouter);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);

	/** Healthcheck */
	// app.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

	/** Error handling */
	app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

		Logger.error(error);
        
        if (error.name === 'CastError') {
            res.status(400).send({error: 'malformated id'})
        }
        else if (error.name === 'ValidationError') {
            res.status(400).json({error: error.message})
        }
        else if (error.name === 'JsonWebTokenError') {
            res.status(400).json({error: error.message})
        }
        else {
            if (res.headersSent) {
                next(error)
            }
            res.status(500).json({ error: error.message })
        }
	});

    // Start the server on the given port from the .env file and log it
	app.listen(config.PORT, () => {
		Logger.info(`Server up and running on http://localhost:${config.PORT}`);
	});
};
