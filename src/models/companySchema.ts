import mongoose from 'mongoose';
import { Faker, fr_CH, en } from '@faker-js/faker';

const companySchema = new mongoose.Schema({
    name: String, 
})

const CompanySchema = mongoose.model('Company', companySchema);

const faker = new Faker({
    locale: [fr_CH, en], 
});

/**
 * Generate fake company
 */
const genFakeCompany = () => new CompanySchema({
    name:  faker.company.name(),
})

export default CompanySchema;
export {companySchema, genFakeCompany};