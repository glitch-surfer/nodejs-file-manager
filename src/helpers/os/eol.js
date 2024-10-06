import os from "node:os";

export const getOS = (flag) => {
    switch (flag) {
        case '--EOL':
            console.log(`System EOL: ${JSON.stringify(os.EOL)}`);
            break;
        default:
            throw new Error('Invalid flag');
    }
}