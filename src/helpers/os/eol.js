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
        default:
            throw new Error('Invalid flag');
    }
}