import  { Router } from 'express';

// import articleController from '../controller/article.js';
import jobInfo, { jobList, createJob, updateJob, deleteJob } from '../controller/job.ts';
import jwtAuth from '../controller/jwtauth.ts';

const AuthRouter : Router  = Router();

// AuthRouter.use('/jobs', jwtAuth.authenticateToken);

AuthRouter
.get('/', jwtAuth.authenticateToken, jobList)
.get('/:id', jwtAuth.authenticateToken, jobInfo)
.post('/', jwtAuth.authenticateToken, createJob)
.put('/', jwtAuth.authenticateToken, updateJob)
.delete('/:id', jwtAuth.authenticateToken, deleteJob);

export default AuthRouter;