import express from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routers/ApiRouter.js';
import './core/db.js';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', ApiRouter);

app.listen(PORT, () => {
    console.log('server has started');
});
