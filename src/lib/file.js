const fs = require('fs');
const RxN = require('rx-node');
const readline = require('readline');
const Rx = require('rx');

function readLinesFromFile(fileName) {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(fileName),
    });

    return RxN.fromReadLineStream(lineReader)
}

function writeToFile(outDir, fileName, source$) {
    const fileStream = fs.createWriteStream(`${outDir}/${fileName}`);

    RxN.writeToStream(source$, fileStream, 'utf8');
}

function getFileNamesFrom(path) {
    const readDir = Rx.Observable.fromNodeCallback(fs.readdir);
    return readDir(path);
}

module.exports = {
    readLinesFromFile,
    writeToFile,
    getFileNamesFrom,
};
