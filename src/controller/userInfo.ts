import jwt from 'jsonwebtoken';
import {RequestHandler,  Request, Response, NextFunction } from 'express';

const userInfo = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token : string = authorization ? authorization.split(' ')[1] : "";
        
    const decoded = jwt.decode(token)

    res.json(decoded);


}

export default userInfo;