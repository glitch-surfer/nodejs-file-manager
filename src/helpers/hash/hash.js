import fs from "fs";
import {pipeline} from 'stream';
import {createHash} from 'crypto';
import {getPathFromArg} from "../get-path-from-arg.js";

export const getHash = (fileName, workingDirectory) => {
    return new Promise((resolve, reject) => {
        const filePath = getPathFromArg(fileName, workingDirectory);

        fs.promises.stat(filePath)
            .then((stat) => stat.isFile() && true)
            .then((isFileExists) => {
                if (!isFileExists) {
                    reject(new Error('File does not exist'));
                } else {
                    const hash = createHash('sha256');

                    pipeline(fs.createReadStream(filePath), hash, (error) => {
                        if (error) {
                            reject(error);
                        }
                        console.log(hash.digest('hex'))
                        resolve();
                    });
                }
            }).catch((error) => {
            reject(error);
        })
    })
};
