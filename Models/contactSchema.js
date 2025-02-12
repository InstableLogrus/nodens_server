import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { randomBoolean, randomInt } from '../utils/misc.js';

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    phone2: {
        type: String,
    },
    mobile: {
        type: String,
    },
    fax: {
        type: String,
    },
    address: {
        type: String,
    },
    npa: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    notes: {
        type: String,
    },


})

const ContactSchema = mongoose.model('Contact', contactSchema);


// génère un faux contact -> ajouter locale pour générer un truc avec des accents
const genFakeContact = () => new ContactSchema({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    phone2: randomBoolean() ? faker.phone.number() : "",
    mobile: faker.phone.number(),
    fax: randomBoolean() ? faker.phone.number() : "",
    address: faker.location.streetAddress(),
    npa: faker.location.zipCode(),
    city: faker.location.city(),
    country: faker.location.country(),
    linkedin: faker.internet.url(),
    notes: randomBoolean() ? faker.lorem.lines(randomInt(2)): "",
})


export default ContactSchema; // schema
export { contactSchema, genFakeContact }; // only json