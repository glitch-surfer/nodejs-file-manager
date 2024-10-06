import path from "path";
import {cd} from "./helpers/nwd/cd.js";
import {up} from "./helpers/nwd/up.js";
import {ls} from "./helpers/nwd/ls.js";
import {read} from "./helpers/fs/read.js";
import {create} from "./helpers/fs/create.js";
import {rename} from "./helpers/fs/rename.js";
import {copy} from "./helpers/fs/copy.js";
import {move} from "./helpers/fs/move.js";
import {remove} from "./helpers/fs/remove.js";
import {getOS} from "./helpers/os/eol.js";

const isSingleCommand = (command) => command.split(' ').length === 1;
const isCommandWithSingleArgument = (command) => command.split(' ').slice(1).map(arg => arg?.toString()?.trim()).filter(Boolean).length === 1;
const getFirstArgument = (command) => command.split(' ')[1];
const getSecondArgument = (command) => command.split(' ')[2];
const isCommandWithTwoArguments = (command) => command.split(' ').slice(1).map(arg => arg?.toString()?.trim()).filter(Boolean).length === 2;

export const commandsMap = new Map([
    ['cd', {
        isValidCommand: (command) => {
            const pathToCheck = getFirstArgument(command);
            return (isCommandWithSingleArgument(command) &&
                (path.normalize(pathToCheck) === pathToCheck || pathToCheck === '..'));
        },
        execute: (command, workingDirectory) => {
            const pathToNavigate = getFirstArgument(command);
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
            const fileName = getFirstArgument(command);
            return read(fileName, workingDirectory);
        }
    }],
    ['add', {
        isValidCommand: (command) => isCommandWithSingleArgument(command),
        execute: (command, workingDirectory) => {
            const fileName = getFirstArgument(command);
            return create(fileName, workingDirectory);
        }
    }],
    ['rn', {
        isValidCommand: (command) => isCommandWithTwoArguments(command),
        execute: (command, workingDirectory) => {
            const prevFileName = getFirstArgument(command);
            const newFileName = getSecondArgument(command);
            return rename(prevFileName, newFileName, workingDirectory);
        }
    }],
    ['cp', {
        isValidCommand: (command) => isCommandWithTwoArguments(command),
        execute: (command, workingDirectory) => {
            const sourceFileName = getFirstArgument(command);
            const newFileName = getSecondArgument(command);
            return copy(sourceFileName, newFileName, workingDirectory);
        }
    }],
    ['mv', {
        isValidCommand: (command) => isCommandWithTwoArguments(command),
        execute: (command, workingDirectory) => {
            const prevDestinationFileName = getFirstArgument(command);
            const newDestinationFileName = getSecondArgument(command);
            return move(prevDestinationFileName, newDestinationFileName, workingDirectory);
        }
    }],
    ['rm', {
        isValidCommand: (command) => isCommandWithSingleArgument(command),
        execute: (command, workingDirectory) => {
            const fileName = getFirstArgument(command);
            return remove(fileName, workingDirectory);
        }
    }],
    ['os', {
        isValidCommand: (command) => isCommandWithSingleArgument(command),
        execute: (command, workingDirectory) => {
            const flag = getFirstArgument(command);
            return getOS(flag);
        }
    }]
]);
