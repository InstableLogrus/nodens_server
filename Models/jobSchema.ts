import mongoose from 'mongoose';
import { Faker, fr_CH, en } from '@faker-js/faker';
import { genFakeCompany } from './companySchema.ts';
import { Schema} from 'mongoose';


// interface IJob {
//     jobTitle: string;
//     language: string;
//     company: Types.ObjectId;
//     link: string;
//     source: string;
// }

// const jobSchema = new Schema<IJob>({
//     jobTitle: {type: String, required: true}, 
//     language: {type: String, required: false}, 
//     company: {type: Schema.Types.ObjectId, ref: 'Company', required: false},
//     link: {type: String, required: true}, 
//     source: {type: String, required: false}, 
// })

const jobSchema = new Schema({
    jobTitle: {type: String, required: true}, 
    language: {type: String, required: false}, 
    company: {type: Schema.Types.ObjectId, ref: 'Company', required: false},
    link: {type: String, required: true}, 
    source: {type: String, required: false}, 
})

const JobSchema = mongoose.model('Job', jobSchema);

const faker = new Faker({
    locale: [fr_CH, en], 
});

const genFakeJob = () => new JobSchema({
    jobTitle: faker.person.jobTitle(),
    language: faker.location.language(),
    company:  genFakeCompany()._id,
    link: faker.internet.url(),
    source: faker.lorem.words(3),
})

export default JobSchema;
export {jobSchema, genFakeJob};