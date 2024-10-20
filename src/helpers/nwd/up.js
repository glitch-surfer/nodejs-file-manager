import path from "path";

export const up = (workingDirectory) => {
    if (workingDirectory.path === workingDirectory.systemRoot) return;

    workingDirectory.path = path.join(workingDirectory.path, '..')
}