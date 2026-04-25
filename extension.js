// Name: Hashmaps
// ID: jerryshashmaps
// Description: Adds Hashmaps to Scratch!
// By: Jerryjhird <https://scratch.mit.edu/users/JerryTheJhird/>
// Original: NONE
// License: MIT License

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
                        text: 'delete key: [KEY] from map: [MAP]',
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
                        opcode: 'jsontomap',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'convert JSON: [JSON] to map: [MAP]',
                        arguments: {
                            JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{"hp": 100, "level": 1}' },
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },

                    {
                        opcode: 'get',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'item: [KEY] from map: [MAP]',
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
                        opcode: 'keys',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all keys from map: [MAP]',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },
                    {
                        opcode: 'values',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all items from map: [MAP]',
                        arguments: {
                            MAP: { type: Scratch.ArgumentType.STRING, defaultValue: 'inventory' }
                        }
                    },

                    {
                        opcode: 'maptojson',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'convert map: [MAP] to JSON',
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

        maptojson(args) {
            const map = registry.get(args.MAP);
            if (!map) return "{}";
            return JSON.stringify(Object.fromEntries(map));
        }

        jsontomap(args) {
            try {
                const obj = JSON.parse(args.JSON);
                const map = this._getmap(args.MAP);
                map.clear();

                for (const [key, value] of Object.entries(obj)) {
                    map.set(key, value);
                }
            } catch (e) {
                console.error("Failed to parse JSON for map:", e);
            }
        }
    }

    Scratch.extensions.register(new hashmapscratch());
})(Scratch);
