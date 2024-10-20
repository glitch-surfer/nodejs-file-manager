import {commandsMap} from "./commands-map.js";

export class CommandsService {
    constructor(workingDirectory) {
        this.workingDirectory = workingDirectory
    }

    async execute(command) {
        if (this.isValidCommand(command)) {
            return commandsMap.get(this.#parseCommand(command)).execute(command, this.workingDirectory);
        }
    }

    isValidCommand(command) {
        return this.hasCommand(command) && commandsMap.get(this.#parseCommand(command)).isValidCommand(command);
    }

    hasCommand(command) {
        return commandsMap.has(this.#parseCommand(command));
    }

    #parseCommand(command) {
        return command.split(' ')[0];
    }
}