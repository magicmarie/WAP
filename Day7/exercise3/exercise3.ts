import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from "sharp";
import cron from "node-cron";

const inputDir = join(__dirname, 'input');
const outputDir = join(__dirname, 'output');

async function findMissingFiles() {
    try {
        const inputFiles = await readdir(inputDir);
        const outputFiles = await readdir(outputDir);

        // Find files in /input that are not in /output
        const missingFiles = inputFiles.filter(file => !outputFiles.includes(file));

        if (missingFiles.length === 0) {
            console.log("All files from /input exist in /output.");
            return;
        }

        // Process and save missing images
        await Promise.all(
            missingFiles.map(async file => {
                const inputPath = join(inputDir, file);
                const outputPath = join(outputDir, file);

                await sharp(inputPath)
                    .resize(200)
                    .jpeg({ mozjpeg: true })
                    .toFile(outputPath);
            })
        );

        console.log(`${missingFiles.length} file(s) added to output directory.`);
    } catch (error) {
        console.error("Error processing images:", error);
    }
}

cron.schedule("*/30 * * * * *", () => {
    console.log(`[${new Date().toLocaleTimeString()}] Running scheduled job...`);
    findMissingFiles();
});

console.log("Cron job scheduled to run every 30 seconds.");

