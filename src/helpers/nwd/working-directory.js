import os from "node:os";

export class WorkingDirectory {
    systemRoot = os.platform() === 'win32' ? process.env.SystemDrive + '\\' : '/';

    #path = os.homedir();

    set path(newPath) {
        this.#path = newPath
    }

    get path() {
        return this.#path
    }

    printLocation() {
        console.log(`You are currently in ${this.#path}`);
    }
};