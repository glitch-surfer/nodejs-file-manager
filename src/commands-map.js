import path from "path";
import {cd} from "./helpers/nwd/cd.js";
import {up} from "./helpers/nwd/up.js";
import {ls} from "./helpers/nwd/ls.js";

const isSingleCommand = (command) => command.split(' ').length === 1

export const commandsMap = new Map([
    ['cd', {
        isValidCommand: (command) => {
            const pathToCheck = command.split(' ')[1];
            return (command.split(' ').slice(1).map(arg => arg?.toString()?.trim()).filter(Boolean).length === 1 &&
                (path.normalize(pathToCheck) === pathToCheck || pathToCheck === '..'));
        },
        execute: (command, workingDirectory) => {
            const pathToNavigate = command.split(' ')[1];
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
    }]
])