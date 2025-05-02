// import { json } from 'stream/consumers';
import bcryptjs from 'bcryptjs';

import UserSchema from '../Models/userSchema.ts';
import Model from '../Models/model.ts';
import Connect from "../connection/connect.ts";
import mongoose,  { Connection } from 'mongoose';
import { promises } from 'dns';


/**
 * Test for creating, accessing and deleting users
 */

describe("Testing User link to database", () => {
    const email = "henri@example.com";
    const hashedPassword = bcryptjs.hashSync("motdepasse", 12);
    const userPayload = {
        name: "Henri Testeur",
        password: hashedPassword,
        email,
        userType: 'user',
        imageUrl: '',
    }
    
    
    test("database connection", async()=> {
        // connecting to DB
        // expect.assertions(1);
        try {
            await Connect();
        }
        catch (error) {
            
        }
    });

    test("User creation", async () => {
        
    
        const hashedPassword = await bcryptjs.hash("motdepasse", 12);
        const newUser = new UserSchema(userPayload);
    
        await newUser.save();
    
    });

    test("User fetching", async () => {
        
        const user = await Model.UserModel.findOne({ email });
        const user_json = user?.toObject();
        const {_id, createdAt, updatedAt, ...finalUser} : any = user_json;

        expect(finalUser).toMatchObject(userPayload);
    
    });

    test("User deletion", async () => {
        
        try {
            await Model.UserModel.deleteOne({ email });
        } catch (error) {
            console.log("error deleting user", error);
        }

        
    });

    test("close connection", async() => {
        mongoose.disconnect();
    })

});
