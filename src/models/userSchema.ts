import mongoose from 'mongoose';
import { Faker, fr_CH, en } from '@faker-js/faker';
import { Schema, model, HydratedDocument } from 'mongoose';
import bcryptjs from 'bcryptjs';


interface IUser {
    name: string;
    password: string;
    email: string;
    userType: string;
    imageUrl: string;
}

const userSchema = new Schema<IUser>(
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

const UserSchema = model<IUser>('User', userSchema);

const faker = new Faker({
    locale: [fr_CH, en],
});



/**
 * generate a fake user
 * @param password force a password instead of using a random one
 * @returns [User : IUser, password: string]
 */
const genFakeUser = async (password?: string): Promise<[HydratedDocument<IUser>, string]> => {
    const pwd = password ?? faker.internet.password();
    const hashedPassword = await bcryptjs.hash(pwd, 12);
    return [new UserSchema({
        name: faker.person.fullName(),
        password: hashedPassword,
        email: faker.internet.email(),
        userType: 'user',
        imageUrl: '',
    }), pwd];
}

export default UserSchema;
export { userSchema, genFakeUser };