import path from "path";

export const getPathFromArg = (fileName, workingDirectory) => path.isAbsolute(fileName)
    ? fileName
    : path.join(workingDirectory.path, fileName);