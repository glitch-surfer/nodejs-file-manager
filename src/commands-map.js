import path from "path";
import {cd} from "./helpers/nwd/cd.js";
import {up} from "./helpers/nwd/up.js";
import {ls} from "./helpers/nwd/ls.js";
import {read} from "./helpers/fs/read.js";
import {create} from "./helpers/fs/create.js";

const isSingleCommand = (command) => command.split(' ').length === 1;
const isCommandWithSingleArgument = (command) => command.split(' ').slice(1).map(arg => arg?.toString()?.trim()).filter(Boolean).length === 1;
const getArgument = (command) => command.split(' ')[1];

export const commandsMap = new Map([
    ['cd', {
        isValidCommand: (command) => {
            const pathToCheck = getArgument(command);
            return (isCommandWithSingleArgument(command) &&
                (path.normalize(pathToCheck) === pathToCheck || pathToCheck === '..'));
        },
        execute: (command, workingDirectory) => {
            const pathToNavigate = getArgument(command);
            return cd(pathToNavigate, workingDirectory);
        }
    }],
    ['up', {
        isValidCommand: (command) => isSingleCommand(command),
        execute: (command, workingDirectory) => {
            return up(workingDirectory);
        }
    }],
    ['ls', {
        isValidCommand: (command) => isSingleCommand(command),
        execute: (command, workingDirectory) => {
            return ls(workingDirectory);
        }
    }],
    ['cat', {
        isValidCommand: (command) => isCommandWithSingleArgument(command),
        execute: (command, workingDirectory) => {
            const fileName = getArgument(command);
            return read(fileName, workingDirectory);
        }
    }],
    ['add', {
        isValidCommand: (command) => isCommandWithSingleArgument(command),
        execute: (command, workingDirectory) => {
            const fileName = getArgument(command);
            return create(fileName, workingDirectory);
        }
    }]
])