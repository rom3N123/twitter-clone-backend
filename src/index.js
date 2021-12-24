import express from 'express';
import dotenv from 'dotenv';
import { router as ApiRouter } from './routers/ApiRouter.js';
import './core/db.js';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api', ApiRouter);

app.listen(PORT, () => {
    console.log('server has started');
});
