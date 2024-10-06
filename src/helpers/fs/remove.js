import fs from "fs";
import {getPathFromArg} from "../get-path-from-arg.js";

export const remove = async (fileName, workingDirectory) => {
    const filePath = getPathFromArg(fileName, workingDirectory);

    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        throw new Error(error);
    }
};
