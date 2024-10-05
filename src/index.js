const USERNAME_KEY = '--username=';
const userName = process.argv.filter(arg => arg.includes(USERNAME_KEY))[0]?.replace(USERNAME_KEY, '') ?? 'Default Username';

console.log(`Welcome to the File Manager, ${userName}!`)