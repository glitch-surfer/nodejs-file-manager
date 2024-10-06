import fs from "fs";
import path from "path";

export const ls = async (workingDirectory) => {
    const dirToPrint = workingDirectory.path;
    try {
        const content = await fs.promises.readdir(dirToPrint)
        const mappedContent = (await Promise.all(content
            .filter(file => {
                if (workingDirectory.path === workingDirectory.systemRoot) {
                    return !file.startsWith('.')
                }
                return true
            })
            .map(async (file) => {
                return {
                    name: file,
                    type: (await fs.promises.stat(path.join(dirToPrint, file))).isDirectory() ? 'directory' : 'file'
                }
            })))

        if (mappedContent.length === 0) {
            console.log('Empty Directory')
            return
        }

        const sortedDirs = mappedContent.filter(file => file.type === 'directory').sort((a, b) => a.name.localeCompare(b.name));
        const sortedFiles = mappedContent.filter(file => file.type === 'file').sort((a, b) => a.name.localeCompare(b.name));
        const sortedContent = sortedDirs.concat(sortedFiles);

        console.table(sortedContent)
    } catch (err) {
        throw new Error(err)
    }

}