import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

export const getUser = (token: string) => {
    try {
        if (token) {
            const data: any = jwt.verify(token, CONFIG.jwt_encryption);
            const { user } = data;
            return JSON.parse(user);
        }
        return null;
    } catch (err) {
        return null;
    }
};
