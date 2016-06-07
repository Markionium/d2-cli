#!/usr/bin/env node
const { isDir, isFile, createDir } = require('./lib/file-utils');
const pickAndExtactTranslationsFromPropertiesFilesByKeys = require('./lib/translations').pickAndExtactTranslationsFromPropertiesFilesByKeys;

const howToCall = (script) => `

Call with:
    ${script.split('/').pop()} <input> <output> [<jsonfile> or <keys...>]
`;
const [_, script, inputDir, outputDir, ...args] = process.argv;
// Check if arg 1 is a directory
if (!isDir(inputDir)) {
    console.error(`\nError: Input should be a directory ${howToCall(script)}`);
    process.exit(1);
}

// Check if arg 2 is a directory
if (!isDir(outputDir)) {
    createDir(outputDir);
}

let stringsToGet;
if (isFile(args[0])) {
    stringsToGet = require(args[0]);
} else {
    stringsToGet = args;
}

pickAndExtactTranslationsFromPropertiesFilesByKeys(stringsToGet, inputDir, outputDir);
