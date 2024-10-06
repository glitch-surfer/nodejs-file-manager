import os from "node:os";

export const getOS = (flag) => {
    switch (flag) {
        case '--EOL':
            console.log(`System EOL: ${JSON.stringify(os.EOL)}`);
            break;

        case '--cpus':
            console.table(os.cpus().map((cpu) => ({
                model: cpu.model,
                speed: cpu.speed,
            })));
            break;

        case '--homedir':
            console.log(`Home directory: ${os.homedir()}`);
            break;

        case '--username':
            console.log(`Username: ${os.userInfo().username}`);
            break;
        default:
            throw new Error('Invalid flag');
    }
}