'use strict';

/**
 * Read a file to a String (encoded in IS0-8859-1)
 *
 * @param {string} filePath - The file path to read
 *
 * @return {string} - The file content
 */
function readFile(filePath) {
    var File = require('dw/io/File');
    var FileReader = require('dw/io/FileReader');

    var tempFile = new File(filePath);
    var fileReader = new FileReader(tempFile, 'ISO-8859-1');

    var fileContent = '';
    var line = '';

    /**
     * Warning: You can reach the maximum string length with this code!
     * api.JsStringLength : Default Limit 10,00,000 (Warninig at 6,00,000).
     */
    do {
        line = fileReader.readN(1000);
        fileContent += line;
    } while (line != null);

    return fileContent;
}

module.exports = {
    readFile: readFile
};
