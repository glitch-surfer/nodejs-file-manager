import fs from "fs";
import {copy} from "./copy.js";
import {getPathFromArg} from "../get-path-from-arg.js";

export const move = async (sourceFileName, destinationFolderName, workingDirectory) => {
    const sourceFilePath = getPathFromArg(sourceFileName, workingDirectory);

    try {
        await copy(sourceFileName, destinationFolderName, workingDirectory);
        await fs.promises.unlink(sourceFilePath);
    } catch (error) {
        throw new Error(error);
    }
}