import express from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routers/ApiRouter.js';
import cors from 'cors';
import './core/db.js';
import './configs/cloudinaryConfig.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/api', ApiRouter);

app.listen(PORT, () => {
    console.log('server has started');
});
