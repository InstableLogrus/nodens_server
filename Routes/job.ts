import  { Router } from 'express';

// import articleController from '../controller/article.js';
import jobInfo, { jobList, createJob, updateJob, deleteJob } from '../controller/job.ts';
import jwtAuth from '../controller/jwtauth.ts';

const AuthRouter : Router  = Router();

// AuthRouter.use('/jobs', jwtAuth.authenticateToken);

AuthRouter
.get('/', jobList)
.get('/:id', jobInfo)
.post('/', createJob)
.put('/', updateJob)
.delete('/:id', deleteJob);

export default AuthRouter;