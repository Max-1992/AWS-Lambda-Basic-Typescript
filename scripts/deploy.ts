import * as dotenv from 'dotenv';
dotenv.config()

import shell from 'shelljs';
import fs, { readdirSync } from 'fs';
import JSZip from 'jszip';
import * as AWS from 'aws-sdk';
import ora from 'ora';

const config = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.DEFULT_REGION
    }
}

// Compile ts to js
const compile = async (): Promise<string[]> =>  {
    shell.exec("npm run build");
    const dir = readdirSync('C:/Users/IncluIT-NB/Desktop/aws-typescript/dist/src')

    console.log(dir);
    return dir;
}

// Create zip
const createZip = async (codes: string[]): Promise<Buffer> => {
    const zip = new JSZip();
    codes.forEach(code => zip.file(`${code}`, code))
    // zip.file('index.js', code);
    const zipFiles = await zip.generateAsync({ type: 'nodebuffer' });
    console.log(zipFiles);
    return zipFiles;
};

// upload to aws
const uploadToAws = async (zipFile: Buffer): Promise<number | undefined> => {
    const lambda = new AWS.Lambda(config.aws);
    const res = await lambda.updateFunctionCode({
        FunctionName: 'lambda-ts-example',
        ZipFile: zipFile
    }).promise()
    return res.CodeSize;
}

// Main function
const deploy = async (): Promise<void> => {
    try {
        const spinner = ora();
        const code = await compile();

        spinner.start('Creating an zip.');
        const zipFile = await createZip(code);
        spinner.succeed('The zip file was created successfully.')

        spinner.start('Creating an lambda function.');
        await uploadToAws(zipFile);
        spinner.succeed('The deploy of the lambda function completed successfully.')
    } catch (error) {
        console.error('Error deploying lambda function. [ERROR]: ', error);
    }
}

// Excecute script.
( async () => await deploy() )()