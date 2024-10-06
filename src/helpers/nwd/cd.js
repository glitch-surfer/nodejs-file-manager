import path from "path";
import {up} from "./up.js";
import * as fs from "node:fs";
import {getPathFromArg} from "../get-path-from-arg.js";

export const cd = async (pathToNavigate, workingDirectory) => {
    if (pathToNavigate.includes('..') && workingDirectory.path === workingDirectory.systemRoot) return;

    if (pathToNavigate === '..') {
        up(workingDirectory);
        return;
    }

    const newPath = getPathFromArg(pathToNavigate, workingDirectory);
    const isPathExists = await fs.promises.stat(newPath).then((stat) => stat.isDirectory() && true).catch(() => false);
    if (!isPathExists) {
        throw new Error('No such directory')
    }

    workingDirectory.path = newPath;
}