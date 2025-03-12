import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import nodemailer from 'nodemailer';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const inputDir = join(__dirname, 'input');
const outputDir = join(__dirname, 'output');

async function findMissingFiles() {
    try {
        const inputFiles = await readdir(inputDir);
        const outputFiles = await readdir(outputDir);

        // Find missing files in output
        const missingFiles = inputFiles.filter(file => !outputFiles.includes(file));

        // Resize missing images and save to output
        for (const file of missingFiles) {
            await sharp(join(inputDir, file))
                .resize(200)
                .jpeg({ mozjpeg: true })
                .toFile(join(outputDir, file));
        }

        // Send status email
        await sendEmail(inputFiles.length, outputFiles.length, missingFiles.length);

        console.log(`${missingFiles.length} new thumbnails generated.`);
    } catch (error) {
        console.error("Error processing thumbnails:", error);
    }
}

async function sendEmail(inputCount: number, outputCount: number, generatedCount: number) {
    const sesClient = new SESClient({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
        }
    });

    const emailParams = {
        Source: process.env.EMAIL_FROM!,
        Destination: {
            ToAddresses: [process.env.EMAIL_TO!]
        },
        Message: {
            Subject: { Data: "Thumbnail Generator App - Status Report" },
            Body: {
                Text: {
                    Data: `
This is an automated email.

The input folder has ${inputCount} thumbnails.
The output folder has ${outputCount} thumbnails.
Generated ${generatedCount} new thumbnails.
                    `
                }
            }
        }
    };

    try {
        await sesClient.send(new SendEmailCommand(emailParams));
        console.log("Status email sent successfully!");
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

// Run the script
findMissingFiles();
