import { Router } from 'express';
import multer, { StorageEngine } from 'multer';

import userSignUp from '../controller/SignUp.ts';
import userSignIn from '../controller/userSignin.ts';
import userRefresh from '../controller/userRefresh.ts';
import userInfo from '../controller/userInfo.ts';
import jwtAuth from '../controller/jwtauth.ts';

const AuthRouter : Router = Router();
const storage : StorageEngine = multer.memoryStorage();
const upload = multer({
  storage,
});

AuthRouter
.post('/login', userSignIn)
.post('/refresh', userRefresh)
.post('/signUp', upload.single('imageUrl'), userSignUp)
.post('/queryUserInfoByAuth', jwtAuth.authenticateToken, userInfo);

export default AuthRouter;
