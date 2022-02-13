import express from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routers/ApiRouter.js';
import cors from 'cors';
import './core/db.js';
import './configs/cloudinaryConfig.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

const CORS_ORIGIN = 'http://localhost:3000';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: CORS_ORIGIN,
	},
});

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
	cors({
		credentials: true,
		origin: CORS_ORIGIN,
	})
);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

io.on('connection', socket => {
	console.log('a user connected');
	console.log(socket);
});

app.use('/api', ApiRouter);

server.listen(PORT, () => {
	console.log('server has started');
});
