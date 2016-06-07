const { getFileNamesFrom, readLinesFromFile, writeToFile } = require('./file');
const Rx = require('rx');

const noop = () => {};

// All other args are keys or a json file with keys
function extractKeys(keyList, input) {
    return input
        .map(line => line.split('='))
        // Only use keys that are in the provided key list
        .filter(([key]) => keyList.includes(key))
        // Trim both the key and the value from white space on both ends
        .map(lineParts => lineParts.map(v => v.trim()))
        .distinct(([key]) => key)
        .map(splitLine => `${splitLine.join('=')}\n`)
}

function processFile(stringsToGet, outputDir, fileName) {
    const linesForFile$ = readLinesFromFile(fileName);
    const extractedLines$ = extractKeys(stringsToGet, linesForFile$);
    writeToFile(outputDir, fileName.split('/').pop(), extractedLines$);
}

function pickAndExtactTranslationsFromPropertiesFilesByKeys(stringsToGet, inputDir, outputDir) {
    getFileNamesFrom(inputDir, outputDir)
        .flatMap(fileNames => Rx.Observable.from(fileNames))
        .map(fileName => `${inputDir}/${fileName}`)
        .filter(fileName => /\.properties/.test(fileName))
        .map(fileName => processFile(stringsToGet, outputDir, fileName))
        .subscribe(
            noop,
            process.emitWarning,
            () => console.log('Complete!')
        );
}

module.exports = {
    pickAndExtactTranslationsFromPropertiesFilesByKeys,
};
