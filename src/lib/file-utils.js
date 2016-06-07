const fs = require('fs');

function createDir(outputDir) {
    try {
        console.log('Creating output directory: ', outputDir);
        fs.mkdirSync(outputDir);
    } catch(e) {
        console.error('Failed to create output directory', e);
        process.exit(1);
    }
}

function isFile(path) {
    try {
        return fs.statSync(path).isFile();
    } catch(e) {
        process.emitWarning(e);
    }
    return false;
}

function isDir(path) {
    try {
        return fs.statSync(path).isDirectory();
    } catch(e) {
        console.warn(`Directory '${path}' does not exist.`);
    }
    return false;
}

module.exports = {
    createDir,
    isFile,
    isDir,
};
