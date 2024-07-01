'use strict';

/**
 * Encodes a string into a base64 string with an email-safe line width
 *
 * @param {string} str String the string to encode
 * @param {string} characterEncoding String the character encoding (i.e. 'ISO-8859-1')
 *
 * @return {string} The encoded string
 */
function encodeStringToBase64(str, characterEncoding) {
    var StringUtils = require('dw/util/StringUtils');
    var StringWriter = require('dw/io/StringWriter');
    var strBase64 = StringUtils.encodeBase64(str, characterEncoding);
    var strBase64LB = '';
    var stringWriter = new StringWriter();

    var offset = 0;
    var length = 76;

    while (offset < strBase64.length) {
        var maxOffset = offset + length;

        if (strBase64.length >= maxOffset) {
            stringWriter.write(strBase64, offset, length);
            stringWriter.write('\n');
        } else {
            stringWriter.write(strBase64, offset, length - (maxOffset - strBase64.length));
        }
        offset += length;
    }

    stringWriter.flush();
    strBase64LB = stringWriter.toString();
    stringWriter.close();

    return strBase64LB;
}

module.exports = {
    encodeStringToBase64: encodeStringToBase64
};
