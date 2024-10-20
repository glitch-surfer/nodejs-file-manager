import fs from "fs";
import {getPathFromArg} from "../get-path-from-arg.js";

export const read = async (fileName, workingDirectory) => {
    if (!fileName) {
        throw new Error('File name is required');
    }

    const filePath = getPathFromArg(fileName, workingDirectory);

    try {
        const stats = await fs.promises.stat(filePath);

        if (stats.isDirectory()) {
            throw new Error('Specified path is a directory, not a file');
        }

        fs.createReadStream(filePath).pipe(process.stdout)
    } catch (error) {
        throw error;
    }
};
