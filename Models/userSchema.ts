import mongoose from 'mongoose';
import { Faker, fr_CH, en } from '@faker-js/faker';
import { Schema, model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    userType: {
      type: String,
      default: 'user',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = model('User', userSchema);

const faker = new Faker({
    locale: [fr_CH, en], 
});


const password = faker.internet.password();
const hashedPassword = await bcryptjs.hash(password, 12)
const genFakeUser = () => new UserSchema({
    name: faker.person.fullName(),
    password: hashedPassword,
    email:  faker.internet.email(),
    userType: 'user',
    imageUrl: '',
})

export default UserSchema;
export {userSchema, genFakeUser};