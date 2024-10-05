import * as os from "node:os";

const USERNAME_KEY = '--username=';
const userName = process.argv.filter(arg => arg.includes(USERNAME_KEY))[0]?.replace(USERNAME_KEY, '') ?? 'Default Username';
let workingDirectory = os.homedir();

const printLocation = () => console.log(`You are currently in ${workingDirectory}`);

console.log(`Welcome to the File Manager, ${userName}!`)

printLocation();

process.once('beforeExit', () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`))