import express from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routers/ApiRouter.js';
import cors from 'cors';
import './core/db.js';
import './configs/cloudinaryConfig.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import DialogsMessagesService from './services/DialogsMessagesService.js';
import jwt from 'jsonwebtoken';

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

const onlineUsers = {};

io.on('connection', socket => {
	const token = socket.handshake.auth.token;
	const user = token ? jwt.verify(token, process.env.JWT_SIGNATURE) : {};

	if (user.id) {
		console.log('emit online');
		onlineUsers[user.id] = true;
		io.emit('JOIN_ONLINE', user.id);
	}

	socket.on('GET_IS_ONLINE', userId => {
		const isOnline = Boolean(onlineUsers[userId]);

		if (isOnline) {
			io.emit('JOIN_ONLINE', userId);
		}
	});

	socket.on('CONNECT', user => {
		console.log('user connected');
		socket.emit('JOIN_ONLINE', user._id);
	});

	socket.on('DISCONNECT', user => {
		console.log(`user disconnect: ${user._id}`);
		socket.emit('LEAVE_ONLINE', user);
		socket.disconnect();
	});

	socket.on('SEND_MESSAGE', async ({ userId, dialogId, text }) => {
		const message = await DialogsMessagesService.create(
			{
				text,
				author: userId,
				dialog: dialogId,
			},
			true
		);

		io.to(dialogId).emit('GET_MESSAGE', message);
	});
	socket.on('JOIN_DIALOG', ({ dialogId }) => {
		socket.join(dialogId);
	});
	socket.on('LEAVE_DIALOG', ({ dialogId }) => {
		socket.leave(dialogId);
	});

	socket.on('disconnect', socket => {
		console.log('disconnected');
		onlineUsers[user.id] = false;
		io.emit('LEAVE_ONLINE', user.id);
	});
});

app.use(
	cors({
		credentials: true,
		origin: CORS_ORIGIN,
	})
);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use('/api', ApiRouter);

server.listen(PORT, () => {
	console.log('server has started');
});
