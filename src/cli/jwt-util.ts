#!/usr/bin/env -S npx tsx

import { program, Command, Option } from '@commander-js/extra-typings';
import { createEncryptedToken, verifyEncryptedToken } from '../utils/jwt_tools.ts';
import {access, promises as fs} from 'node:fs';
import dotenv from 'dotenv';


const title = ` _______             .___                    
 \\      \\   ____   __| _/____   ____   ______
 /   |   \\ /  _ \\ / __ |/ __ \\ /    \\ /  ___/
/    |    (  <_> ) /_/ \\  ___/|   |  \\\\___ \\ 
\\____|__  /\\____/\\____ |\\___  >___|  /____  >
        \\/            \\/    \\/     \\/     \\/ `

/**
 * create a token from a payload JSON file with secret from .env
 * @param payloadPath path to the payload file (json)
 * @param options options provided as handler of commander
 * @returns void
 */
const handler_create = async(payloadPath : string, options : any) => {

    try {
        const payload = await fs.readFile(payloadPath, 'utf8');

        const exp = options.expire ?? '1h';
        const payload_json = JSON.parse(payload);
        const accessToken = await createEncryptedToken(payload_json, process.env.JWT_SECRET, exp);

        const spacer = "#".repeat(80);
        console.log(`${spacer}\n${accessToken}\n${spacer}`);
    }
    catch (error : any) {
        switch(error.code) {
            case 'ENOENT':
                console.log("This file does not exists !");
                return;
        }

        switch(error.name) {
            case 'SyntaxError':
                console.log("JSON file malformed !");
                return;
        }

        console.log("error: ", error, error.name, error.code);
    }
}

/**
 * Verify if token is valid and print header and payload
 * @param token Verify encrypted token (JWE) with the secret in .env
 * @param options 
 */
const handler_verify = async(token : string, options : any) => {
    try {
        const { payload, protectedHeader } = await verifyEncryptedToken(token, process.env.JWT_SECRET);

        console.log(`Token verified !!\nHeader: ${JSON.stringify(protectedHeader,null,'\t')}\nPayload: ${JSON.stringify(payload,null,'\t')}`);
    }
    catch (error:any) {
        switch (error.code) {
            case 'ERR_JWT_EXPIRED':
                console.log("Token expired !");
                break;
            case 'ERR_JWT_CLAIM_VALIDATION_FAILED':
                console.log("Validation failed !");
                // @TODO: delete the refresh cookie if decryption failed -> forged or invalid -> force login
                // console.log(`Could not validate the token. Cause: ${error.reason} for ${error.claim}`);
                break;

            case 'ERR_JWE_DECRYPTION_FAILED':
                console.log("Decryption failed !");
                // @TODO: delete the refresh cookie if decryption failed -> forged or invalid -> force login
                // console.log(`Decryption failed`);
                break;

            default:
                // propagate if not identified
                console.log("error: ", error.name);
                console.log("could not verify the token, error !", error)
        }

    }
}


/*
* command line to generate fake data in the database
*/
async function main() {

    dotenv.config();

    program
        .name("jwt-utils")
        .version("0.0.1")
        .description("\x1b[32m" + title + "\x1b[0m" + "\nmanage JWT keys" )

    program.command('create')
        .description("Create a new JWE token ex: 'jwt-util create -e 3h local/token_payload.json'")
        .argument("<file>", "json file to use as payload")
        .option('-e --expire <string>', "duration of the valid token before expiration")
        .action(handler_create);

    program.command('verify')
        .description("verify a token with the secret in .env and print header and payload")
        .argument('<string>', "token to verify")
        .action(handler_verify);

    await program.parseAsync(process.argv);
    process.exit()
}

main();
