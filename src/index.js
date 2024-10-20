import * as readline from "node:readline";
import {CommandsService} from "./commands-service.js";
import {WorkingDirectory} from "./working-directory.js";

const USERNAME_KEY = '--username=';
const userName = process.argv.filter(arg => arg.includes(USERNAME_KEY))[0]?.replace(USERNAME_KEY, '') ?? 'Default Username';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const workingDirectory = new WorkingDirectory();
const commandService = new CommandsService(workingDirectory)
const exit = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
    process.exit();
};

console.log(`Welcome to the File Manager, ${userName}!`)
workingDirectory.printLocation();

rl.on('SIGINT', exit);

const promptUser = () => {
    rl.question('', async (input) => {
        const command = input.trim();

        if (command === '.exit') {
            exit();
        } else if (commandService.hasCommand(command)) {
            try {
                if (commandService.isValidCommand(command)) {
                    await commandService.execute(command);
                } else {
                    console.log('Invalid input');
                }
            } catch (err) {
                console.log(err);
                console.log('Operation failed')
            }

            workingDirectory.printLocation();
            promptUser();
        } else {
            console.log('Invalid input');
            promptUser();
        }
    });
}

promptUser();