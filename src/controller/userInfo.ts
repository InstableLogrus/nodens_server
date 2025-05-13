import jwt from 'jsonwebtoken';
import {RequestHandler,  Request, Response, NextFunction } from 'express';

const userInfo = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token : string = authorization ? authorization.split(' ')[1] : "";
        
    const { email, name, roles } = req.user;
    const user = {email, name, roles};

    // console.log("user: ", user);

    // const decoded = jwt.decode(token)

    res.json(user);


}

export default userInfo;