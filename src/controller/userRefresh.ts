import jwt from 'jsonwebtoken';
import {RequestHandler,  Request, Response, NextFunction } from 'express';
import { createEncryptedToken, verifyEncryptedToken } from '../utils/jwt_tools.ts';

// refresh access token (make a new access token and anoth refresh token with the same expiration)
const userRefresh = async (req: Request, res: Response, next: NextFunction)  => {
    const previous_refreshToken = req.cookies.refreshToken;

    if (previous_refreshToken == null) return res.sendStatus(401);

    try {
        const { payload, protectedHeader } = await verifyEncryptedToken(previous_refreshToken, process.env.JWT_SECRET);
        const {email, name, exp, ...rest} = payload;
        const payload_access = {email, name};
        const payload_refresh = {email, name, exp} ;

        const accessToken = await createEncryptedToken(payload_access, process.env.JWT_SECRET, '1h');
        const refreshToken = await createEncryptedToken(payload_refresh, process.env.JWT_SECRET, exp);

        // refresh token as httponly cookie 
        res.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 48 * 3600000), // cookie will be removed after 48 hours (test)
            httpOnly: true, // JS can't read it
            secure: false, // should be true in prod
            sameSite: 'lax', // dev
            devdomain: "localhost", // dev
        })

        // access token as json for app to access it (easier for debug)
        res.json({
            accessToken /*, refreshToken*/
        });
    }
    catch (error:any) {
        switch (error.code) {
            case 'ERR_JWT_CLAIM_VALIDATION_FAILED':
                res.sendStatus(403);
                // console.log(`Could not validate the token. Cause: ${error.reason} for ${error.claim}`);
                break;

            case 'ERR_JWE_DECRYPTION_FAILED':
                res.sendStatus(403);
                // console.log(`Decryption failed`);
                break;

            default:
                // propagate if not identified
                console.log("error: ", error.name);
                return res.sendStatus(500);
        }
    }



    // jwt.verify(refreshToken, process.env.JWT_SECRET as string, (err: any, payload: any) => {

    //     if (err) {
    //         res.sendStatus(403);
    //     }

    //     // console.log("refresh: ", payload);

    //     const {email, name, exp, ...rest} = payload;
    //     const payload_access = {email, name};
    //     const payload_refresh = {email, name, exp} ;

    //     const accessToken = jwt.sign(payload_access, process.env.JWT_SECRET, { expiresIn: 60 }); // 60 pour test
    //     const refreshToken = jwt.sign(payload_refresh, process.env.JWT_SECRET);

    //     // refresh token as httponly cookie 
    //     res.cookie('refreshToken', refreshToken, {
    //         expires: new Date(Date.now() + 48 * 3600000), // cookie will be removed after 48 hours (test)
    //         httpOnly: true, // JS can't read it
    //         secure: false, // should be true in prod
    //         sameSite: 'lax', // dev
    //         devdomain: "localhost", // dev
    //     })

    //     // access token as json for app to access it (easier for debug)
    //     res.json({
    //         accessToken /*, refreshToken*/
    //     });

    //     // return res.sendStatus(400);
    // });

}

export default userRefresh;