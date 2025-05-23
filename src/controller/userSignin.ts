import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {RequestHandler,  Request, Response, NextFunction } from 'express';

import Model from '../models/model.ts';
import { createEncryptedToken } from '../utils/jwt_tools.ts';
import { access } from 'fs';

/**
 * create a new JWT token from user information and send it back to client
 *  generate a response JSON {accessToken} and a secure cookie {refreshToken}
 * @param user Object {id:string, email:string, name:string}
 * @param res 
 * @param next 
 */
const createToken = async (user : any, res: Response, next: NextFunction) => {
    const { _id: id, email, name } = user;
    const payload = {
        sub: id.toString(),
        email,
        name,
        roles: 'manager', // @TODO: derive from DB schema (enum ?)
    };
   
    // const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 }); // 60 pour test
    // const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });

    const accessToken = await createEncryptedToken(payload, process.env.JWT_SECRET, '1h');
    const refreshToken = await createEncryptedToken(payload, process.env.JWT_SECRET, '2w');

    // refresh token as httponly cookie 
    res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + 2 * 7 * 24 * 3600000), // cookie will be removed after 2*7*24 hours @TODO: should match with the JWT timing
        httpOnly: true, // JS can't read it
        secure: false, // should be true in prod
        // secure = only send cookie over https
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
    })
    // console.log("cookie");
    // access token as json for app to access it (easier for debug)
    res.json({
        accessToken
    });

};

// signin handler for router
const userSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Find user with the passed email
    Model.UserModel.findOne({ email }).then((user) => {
        if (user) {
            // console.log("user: ", user);
            // if email found compare the password
            bcryptjs.compare(password, user.password).then((result) => {
                // if password match create payload
                if (result) {
                    createToken(user, res, next);
                    // req.app.oauth.authorize()
                } else {
                    res.status(400);
                    next(new Error('Invalid Password'));
                }
            });
        } else {
            // Wrong Password.
            res.status(400);
            next(new Error('No User Exist With This Email'));
        }
    });
};

export default userSignIn;
