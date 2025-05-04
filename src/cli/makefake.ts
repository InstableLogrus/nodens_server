#!/usr/bin/env -S npx tsx
// https://github.com/TypeStrong/ts-node/issues/639#issuecomment-538984217

import {genFakeUser} from "../models/userSchema.ts"
import { program, Command, Option } from '@commander-js/extra-typings';
import Connect from "../connection/connect.ts";
import { env } from "process";

const handler = async (options:any, env:any) =>{
    // temp hardcoded -> @todo: let choose the model
    console.log("generating new User !");
    const [newUser, userPassword]  = await genFakeUser(options.password);
    await newUser.save();
    console.log(`Created user "${newUser.name}" "${newUser.email}" with password "${userPassword}".`);
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
        .option("-m, --model <string>", "choose the model to generate from")
        .option("-p, --password <string>", "force use of this password")
        .action(handler)

    await program.parseAsync(process.argv);
    process.exit()
}

main();



