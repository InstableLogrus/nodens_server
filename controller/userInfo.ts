import jwt from 'jsonwebtoken';
import Model from '../Models/model.ts';

const userInfo = (req, res, next) => {
    const { email, password } = req.body;
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    console.log("userinfo: ", email, password, token);
        
    const decoded = jwt.decode(token)
    console.log("decoded:", decoded);
    
    // });
    // next();
    res.json(decoded);


}

export default userInfo;