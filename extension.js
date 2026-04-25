// Name: Hashmaps
// ID: jerryshashmaps
// Description: Adds Hashmaps to Scratch!
// By: Jerryjhird <https://scratch.mit.edu/users/JerryTheJhird/>
// Original: NONE
// License: UNLICENSE

(async function(Scratch) {
    'use strict';

    const registry = new Map();

    class hashmapscratch {
        getInfo() {
            return {
                id: 'jerryshashmaps',
                name: 'Hashmaps',
                color1: '#ff6200',
                color2: '#e65800',
                blocks: [
                    {
                        opcode: 'set',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'add key: [KEY] with value: [VALUE] to map: [MAP]',
                        arguments: {
                            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
                            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'thing' },
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'delete',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete key: [KEY] of map: [MAP]',
                        arguments: {
                            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'clear',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete all of map: [MAP]',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'get',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item: [KEY] of map: [MAP]',
                        arguments: {
                            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' },
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'size',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'length of map: [MAP]',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'has',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'map: [MAP] contains key: [KEY]?',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' },
                            KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'name' }
                        }
                    },
                    {
                        opcode: 'keys',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all keys of map: [MAP]',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'values',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all items of map: [MAP]',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    }
                ]
            };
        }

        _getmap(name) {
            if (!registry.has(name)) {
                registry.set(name, new Map());
            }
            return registry.get(name);
        }

        set(args) {
            this._getmap(args.MAP).set(args.KEY, args.VALUE);
        }

        delete(args) {
            const map = registry.get(args.MAP);
            if (map) map.delete(args.KEY);
        }

        clear(args) {
            const map = registry.get(args.MAP);
            if (map) map.clear();
        }

        get(args) {
            const map = registry.get(args.MAP);
            if (!map || !map.has(args.KEY)) return "";
            return map.get(args.KEY);
        }

        size(args) {
            const map = registry.get(args.MAP);
            return map ? map.size : 0;
        }

        has(args) {
            const map = registry.get(args.MAP);
            return map ? map.has(args.KEY) : false;
        }

        keys(args) {
            const map = registry.get(args.MAP);
            return map ? JSON.stringify(Array.from(map.keys())) : "[]";
        }

        values(args) {
            const map = registry.get(args.MAP);
            return map ? JSON.stringify(Array.from(map.values())) : "[]";
        }
    }

    Scratch.extensions.register(new hashmapscratch());
})(Scratch);
