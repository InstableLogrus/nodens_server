import jwt from 'jsonwebtoken';
import {RequestHandler,  Request, Response, NextFunction } from 'express';


function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    console.log("token: ", token, process.env.JWT_SECRET);
    if (token == null || token == 'Invalid') return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        console.log(err)

        // if (err) return res.sendStatus(403)

        if (err) {
            if (err.name == 'TokenExpiredError') {
                // console.log("expired ! now try refresh token.");
                
                // const refreshToken = req.cookies.refresh_token;

                // // console.log("cookies: ", refreshToken);
                // jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
                //     if (err) {
                //         return res.sendStatus(403);
                //     }

                //     next()
                // });
                
                res.sendStatus(401);
            }
            else if (err.name=='JsonWebTokenError')
            {
                return res.sendStatus(401);
            }
            else {
                console.log("error: ", err.name);
                return res.sendStatus(500);
            }
        }

        req.user = user
        next()
    });
}

// function generateTokens(req: Request, res: Response, next: NextFunction) {
//     const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 }); // 60 pour test
//     const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' });
    
//     // refresh token as httponly cookie 
//     res.cookie('refresh_token', refresh_token, {
//         expires: new Date(Date.now() + 48 * 3600000), // cookie will be removed after 48 hours
//         httpOnly: true, // JS can't read it
//         secure: false, // should be true in prod
//     })

//     // access token as json for app to access it (easier for debug)
//     res.json({
//         access_token
//     });
// }

export default { authenticateToken };