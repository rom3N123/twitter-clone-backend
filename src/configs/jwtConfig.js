import dotenv from 'dotenv';
dotenv.config();

export const signature = process.env.JWT_SIGNATURE;

export const options = {
    expiresIn: '24h',
};
