import path from "path";
import os from "os";

export const up = (workingDirectory) => {
    if (workingDirectory.path === workingDirectory.systemRoot) return;

    workingDirectory.path = path.join(workingDirectory.path, '..')
}