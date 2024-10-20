import path from "path";
import fs from "fs";
import {getPathFromArg} from "../get-path-from-arg.js";

export const rename = async (prevFileName, newFileName, workingDirectory) => {
    if (!prevFileName || !newFileName) {
        throw new Error('File name is required');
    }

    const filePath = getPathFromArg(prevFileName, workingDirectory);
    const newFilePath = getPathFromArg(newFileName, workingDirectory);

    try {
        const prevFileStats = await fs.promises.stat(filePath);
        const isNewFileExists = await fs.promises.stat(newFilePath).then(() => true).catch(() => false);

        if (prevFileStats.isDirectory() || isNewFileExists) {
            throw new Error('Should specify a correct file names');
        }

        await fs.promises.rename(filePath, newFilePath);
    } catch (error) {
        throw error;
    }
};
