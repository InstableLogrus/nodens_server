#!/usr/bin/env -S npx tsx
// https://github.com/TypeStrong/ts-node/issues/639#issuecomment-538984217

import {genFakeUser} from "../models/userSchema.ts"
import { program, Command, Option } from '@commander-js/extra-typings';
import Connect from "../connection/connect.ts";
import { env } from "process";
import { genFakeJob } from "../models/jobSchema.ts";
import model from "../models/model.ts";

const handler_user = async (options:any, env:any) =>{
    // temp hardcoded -> @todo: let choose the model
    console.log("generating new User !");
    const [newUser, userPassword]  = await genFakeUser(options.password);
    await newUser.save();
    console.log(`Created user "${newUser.name}" "${newUser.email}" with password "${userPassword}".`);
}

const handler_job = async (email: string, options:any, env:any) => {
    try {
        const n = +(options.number ?? 1);

        const user = await model.UserModel.findOne({ email });
        if (!user) {
            console.log("Error: unknown user");
            return;
        }


        for (let i=0; i<n; i++) {
            const fakeJob = genFakeJob(user._id.toString());
            await fakeJob.save();
            console.log(`Created job "${fakeJob.jobTitle}" for "${user.email}"`);
        }
    }
    catch (error) {
        console.log("error: ", error);
    }
}

/*
* command line to generate fake data in the database
*/
async function main() {
    // Initialize MongoDB connection
    await Connect();
    
    program
        .version("0.0.1")
        .description("make fake data")

    program.command('user')
        .description("make fake user given password")
        .option("-p, --password <string>", "force use of this password")
        .action(handler_user)

    program.command('job')
        .description("make fake job(s)")
        .argument("<string>", "email address of an existing user")
        .option("-n --number <int>", "number of jobs to create, default 0")
        .action(handler_job)

    await program.parseAsync(process.argv);
    process.exit()
}

main();



