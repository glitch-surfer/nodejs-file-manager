import fs from 'fs';
import path from 'path';

export const create = async (fileName, workingDirectory) => {
    const filePath = path.join(workingDirectory.path, fileName);

    const isFileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false)

    if (isFileExists) {
        throw new Error('File already exists');
    }

    await fs.promises.writeFile(filePath, '', 'utf-8');
};
