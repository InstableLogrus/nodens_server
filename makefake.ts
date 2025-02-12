#!/usr/bin/env node

import mongoose from "mongoose";
import Model from "./Models/Model.js";
import {genFakeProject} from "./Models/projectSchema.js"
// const { program } = require('commander');
import {program } from "commander"
import Connect from "./connection/connect.js";

// Initialize MongoDB connection
await Connect();

program
    .version("0.0.1")
    .description("make fake data")
    .option("-m, --model <model>", "choose the model to generate from")
    .action((options) => {
        
        const project  = genFakeProject();
        project.save();
        // console.log("ok !");
    })

program.parse(process.argv);



