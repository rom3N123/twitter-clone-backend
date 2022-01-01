import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_PW = process.env.DB_PW;
const DB_NAME = process.env.DB_NAME;
const DB_USER_NAME = process.env.DB_USER_NAME;

const DB_URL = `mongodb+srv://${DB_USER_NAME}:${DB_PW}@cluster0.cdpsu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Connected to db!');
});

export { db };
