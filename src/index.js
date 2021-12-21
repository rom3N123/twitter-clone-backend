import express from 'express';
import dotenv from 'dotenv';
import { UserController } from './controllers/UserController.js';
import './core/db.js';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/users', UserController.getUser);

app.listen(PORT, () => {
    console.log('server has started');
});
