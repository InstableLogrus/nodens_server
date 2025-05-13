
import {RequestHandler,  Request, Response, NextFunction } from 'express';
import Model from '../models/model.ts';


// allowed filters and case conversion
const ALLOWED_FILTERS: Record<string, string> = {
    jobtitle: 'jobTitle',
    language: 'language',
    source:  'source',
    status: 'status',
}
// only filter keys (faster)
const ALLOWED_FILTERS_KEYS = Object.keys(ALLOWED_FILTERS);

// give job list (array of obj)
// @TODO: retrieve only for current user (more if manager)
const jobList: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    const limit = +(req.query.limit ?? 0);
    const filters = req.query.filter ?? {};
    const offset = +(req.query.offset ?? 0);

    // filter and convert key from params (which can be lowercase)
    const parsedFilters = Object
        .keys(filters)
        .filter(k=>ALLOWED_FILTERS_KEYS.includes(k))
        .reduce((a:Object, v:string ) => ({ ...a, [ALLOWED_FILTERS[v]]:  { "$regex": filters[v], "$options": "i" } } ), {});

    const docs = await Model.JobModel
        .find(parsedFilters)
        .skip(offset)
        .limit(limit);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(docs));
}

// create a job with the given json
// @todo: linking to the current user
const createJob : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const obj = await Model.JobModel.create(req.body);
        res.status(200);
        next();

    } catch {
        res.status(400);
        next();
    }
}

// update the job with the json data -> should have a _id field with a valid id
// @todo: if not current user (or manager) -> no update authorized
const updateJob : RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id, ...change} = req.body;
        const query = await Model.JobModel.updateOne({ _id: id }, change);
        const count = query.matchedCount; // Number of documents matched
        const modified = query.modifiedCount; // Number of documents modified
        res.status(200);
        res.json({
            count, modified
        });

    } catch {
        res.status(500);
        next();
    }

}

// delete a job awith the corresponding id
// @TODO: only if a current user job (or manager doing it)
const deleteJob  = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const job = await Model.JobModel.findById(id);
    if (job) {

    }
}


// return job json
const jobInfo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    // Find user with the passed id
    const job = await Model.JobModel.findById(id);
    res.status(200);
    res.json(job);
};

export default jobInfo;
export { jobList, createJob, updateJob, deleteJob};