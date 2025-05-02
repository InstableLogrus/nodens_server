import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Model from '../Models/model.ts';

const createToken = (user, res, next) => {
    const { id, email, name } = user;
    const payload = {
        _id: id,
        email,
        name,
    };


    
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 }); // 60 pour test
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });

    // refresh token as httponly cookie 
    res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 3600000), // cookie will be removed after 7*24 hours
        httpOnly: true, // JS can't read it
        secure: false, // should be true in prod
        // secure = only send cookie over https
        secure: false,
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
    })
    // console.log("cookie");
    // access token as json for app to access it (easier for debug)
    res.json({
        accessToken
    });

};

const userSignIn = (req, res, next) => {
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
