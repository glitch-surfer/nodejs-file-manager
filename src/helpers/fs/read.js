import path from "path";
import fs from "fs";

export const read = async (fileName, workingDirectory) => {
    if (!fileName) {
        throw new Error('File name is required');
    }

    const filePath = path.isAbsolute(fileName)
        ? fileName
        : path.join(workingDirectory.path, fileName);

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
