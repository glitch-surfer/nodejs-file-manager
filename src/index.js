import * as os from "node:os";
import * as readline from "node:readline";

const USERNAME_KEY = '--username=';
const userName = process.argv.filter(arg => arg.includes(USERNAME_KEY))[0]?.replace(USERNAME_KEY, '') ?? 'Default Username';
let workingDirectory = os.homedir();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const printLocation = () => console.log(`You are currently in ${workingDirectory}`);
const goodBye = () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
const exit = () => {
    goodBye();
    rl.close();
    process.exit();
};


console.log(`Welcome to the File Manager, ${userName}!`)

printLocation();

// process.once('exit', () => goodBye())
rl.on('SIGINT', exit);

const promptUser = () => {
    rl.question('', (input) => {
        const command = input.trim();

        if (command === '.exit') {
            exit();
        } else {
            promptUser();
        }
    });
}

promptUser();