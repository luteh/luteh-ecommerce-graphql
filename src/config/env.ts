import dotenv from 'dotenv';

dotenv.config();

export const port: number = Number(process.env.PORT) || 4000;
export const db: { user: string | undefined; host: string; database: string | undefined; password: string | undefined; port: number } = {
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
};
export const jwtSecret: string = 'your-secret-key';

