import path from "path";
import fs from "fs";
import {pipeline} from "stream/promises";
import {createBrotliCompress, createBrotliDecompress} from "zlib";
import {getPathFromArg} from "../get-path-from-arg.js";

export const compressDecompress = async (sourceFileName, destinationFileName, action, workingDirectory) => {
    const sourceFilePath = getPathFromArg(sourceFileName, workingDirectory);
    const destinationPath = getPathFromArg(destinationFileName, workingDirectory);
    const isCompression = action === 'compress';

    const isSourceFileExists = await fs.promises.stat(sourceFilePath).then((file) => file.isFile() && true).catch(() => false);
    const isDestinationPathFolder = await fs.promises.stat(destinationPath).then((file) => file.isDirectory() && true)

    if (!isSourceFileExists) {
        throw new Error('Should specify a correct file names');
    }

    try {
        await pipeline(
            fs.createReadStream(sourceFilePath),
            isCompression ? createBrotliCompress() : createBrotliDecompress(),
            fs.createWriteStream(isDestinationPathFolder
                ? path.join(destinationPath, isCompression
                    ? sourceFileName + '.br'
                    : sourceFileName.slice(0, -3))
                : destinationPath),
        )
    } catch (error) {
        throw new Error(error);
    }
};
