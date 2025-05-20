import mongoose from 'mongoose';
import { Faker, fr_CH, en } from '@faker-js/faker';
import { genFakeCompany } from './companySchema.ts';
import { Schema, Types} from 'mongoose';
import { genFakeUser } from './userSchema.ts';
import { userInfo } from 'os';

const ApplicationStatusEnum = {
    values: [
        'NONE', 'READ', 'CONSIDERED', 'SENT', 'ACCEPTED', 'REFUSED'
    ],
    message: 'enum validator failed for path `{PATH}` with value `{VALUE}`' 
}

const Languages = ["en", "fr"];

interface IJob {
    _id: Types.ObjectId;
    jobTitle: string;
    language: string;
    // company: Types.ObjectId;
    company: string,
    link: string;
    source: string;
    user: Types.ObjectId;
    status: string;
}

// const jobSchema = new Schema<IJob>({
//     jobTitle: {type: String, required: true}, 
//     language: {type: String, required: false}, 
//     company: {type: Schema.Types.ObjectId, ref: 'Company', required: false},
//     link: {type: String, required: true}, 
//     source: {type: String, required: false}, 
// })


/*
    Create index for text search in multiple fields https://stackoverflow.com/a/35843354/30231852

 */

/**
 * Model for Job entry -> need to be linked to an existing user
 */
const jobSchema = new Schema({
    jobTitle: {type: String, required: true}, 
    language: {type: String, required: false}, 
    // company: {type: Schema.Types.ObjectId, ref: 'Company', required: false},
    company: {type: String, required: true},
    link: {type: String, required: true}, 
    source: {type: String, required: false}, 
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: ApplicationStatusEnum, default: 'NONE'}
}, {
    toJSON: {
        transform(doc: IJob, ret: any) {
            ret.id = doc._id; // don't expose _id directly to client
            delete ret._id;
        }
    }
})
// multifields index for company, jobTitle and status
jobSchema.index({jobTitle: 'text', company: 'text', status: 'text'}, {name: 'searchIndex'});

const JobSchema = mongoose.model('Job', jobSchema);

const faker = new Faker({
    locale: [fr_CH, en], 
});

// generate fake job -> must pass user id 
const genFakeJob = (userid: string) => new JobSchema({
    jobTitle: faker.person.jobTitle(),
    language: faker.helpers.arrayElement(Languages),
    // company:  genFakeCompany()._id,
    company: faker.company.name(),
    link: faker.internet.url(),
    source: faker.lorem.words(3),
    user: Types.ObjectId.createFromHexString(userid), 
    status: faker.helpers.arrayElement(ApplicationStatusEnum.values), 
})

export default JobSchema;
export {jobSchema, genFakeJob};