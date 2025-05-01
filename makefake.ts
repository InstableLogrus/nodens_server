#!/usr/bin/env node

import {genFakeUser} from "./Models/userSchema.ts"
// const { program } = require('commander');
// import { program } from "commander";
import { program } from '@commander-js/extra-typings';
import Connect from "./connection/connect.js";

// Initialize MongoDB connection
Connect();


/*
 * command line to generate fake data in the database
 */
program
    .version("0.0.1")
    .description("make fake data")
    .option("-m, --model <model>", "choose the model to generate from")
    .action((options) => {
        // temp hardcoded -> @todo: choose the model
        const newuser  = genFakeUser();
        newuser.save();
        // console.log("ok !");
    })

program.parse(process.argv);



