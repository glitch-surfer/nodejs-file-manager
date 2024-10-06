import path from "path";
import {up} from "./up.js";
import * as fs from "node:fs";

export const cd = async (pathToNavigate, workingDirectory) => {
    if (pathToNavigate.includes('..') && workingDirectory.path === workingDirectory.systemRoot) return;

    if (pathToNavigate === '..') {
        up(workingDirectory);
        return;
    }

    const newPath = path.isAbsolute(pathToNavigate) ? pathToNavigate : path.join(workingDirectory.path, pathToNavigate);
    if (!fs.existsSync(newPath) || (await fs.promises.stat(newPath)).isFile()) {
        throw new Error('No such directory')
    }

    workingDirectory.path = newPath;
}