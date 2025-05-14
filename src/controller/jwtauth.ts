import jwt from 'jsonwebtoken';
import {RequestHandler,  Request, Response, NextFunction } from 'express';
import { verifyEncryptedToken } from '../utils/jwt_tools.ts';


// if we want to store more data in JWT (to avoid DB I/O) we need to encrypt it 
// use JWS/JWE: https://stackoverflow.com/a/74257561/30231852



/**
 * Auth middeware using JWE token to authorize access on some content
 * 
 * note : to pass info to downstream handler -> https://stackoverflow.com/a/71126179/30231852
 */
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // console.log("token: ", token, process.env.JWT_SECRET);

    if (token == null || token == 'Invalid') res.sendStatus(401)

    try {
        const { payload, protectedHeader } = await verifyEncryptedToken(token, process.env.JWT_SECRET);

        req.user = payload;
        next()

    }
    catch (error:any) {
        switch (error.code) {
            case 'ERR_JWT_EXPIRED':
                res.sendStatus(401);
                break;
            case 'ERR_JWT_CLAIM_VALIDATION_FAILED':
                res.sendStatus(403);
                // @TODO: delete the refresh cookie if decryption failed -> forged or invalid -> force login
                // console.log(`Could not validate the token. Cause: ${error.reason} for ${error.claim}`);
                break;

            case 'ERR_JWE_DECRYPTION_FAILED':
                // @TODO: delete the refresh cookie if decryption failed -> forged or invalid -> force login
                res.sendStatus(403);
                // console.log(`Decryption failed`);
                break;

            default:
                // propagate if not identified
                console.log("error: ", error.name);
                res.sendStatus(500);
        }
    }
}

export default { authenticateToken };