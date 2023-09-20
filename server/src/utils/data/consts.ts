import dotenv from 'dotenv';

dotenv.config();
export const WEBSITE_URL = process.env.WEBSITE_URL as string;
export const NOT_AUTHORIZED_MESSAGE = 'unauthorized';
