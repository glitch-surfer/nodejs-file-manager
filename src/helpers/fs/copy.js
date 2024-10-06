import fs from 'fs';
import {getPathFromArg} from "../get-path-from-arg.js";
import {pipeline} from "stream/promises";
import path from "path";

export const copy = async (sourceFileName, destinationFolderName, workingDirectory) => {
    const sourceFolderPath = getPathFromArg(sourceFileName, workingDirectory);
    const destinationFolderPath = getPathFromArg(destinationFolderName, workingDirectory);

    const isSourceFileExists = await fs.promises.stat(sourceFolderPath).then((file) => file.isFile() && true).catch(() => false);
    const isDestinationPathFolder = await fs.promises.stat(destinationFolderPath).then((file) => file.isDirectory() && true)

    if (!isSourceFileExists) {
        throw new Error('Should specify a correct file names');
    }

    try {
        await pipeline(
            fs.createReadStream(sourceFolderPath),
            fs.createWriteStream(isDestinationPathFolder ? path.join(destinationFolderPath, sourceFileName) : destinationFolderPath)
        )
    } catch (error) {
        throw new Error(error);
    }
};
