'use strict';

var server = require('server');

/**
 * Add files to the attributes to render the mail template.
 *
 * @param {dw.util.Map} mailAttributes - The mail attributes
 */
function addFilesToMailAttributes(mailAttributes) {
    var Map = require('dw/util/HashMap');
    var fileUtils = require('*/cartridge/scripts/utils/fileUtils');
    var encode = require('*/cartridge/scripts/utils/encode');
    var pdfContent = fileUtils.readFile('IMPEX/pdf/test_0.pdf');
    var files = new Map();

    files.put('test.pdf', encode.encodeStringToBase64(pdfContent, 'ISO-8859-1'));

    mailAttributes.put('Base64FileMap', files);
}

/**
 * Just an example controller to test sending a mail with attachments
 */
server.get('Send', function (req, res, next) {
    var Map = require('dw/util/HashMap');
    var Template = require('dw/util/Template');
    var Mail = require('dw/net/Mail');

    // Create the template that we will use to send the email.
    var template = new Template('mail/mail_attachment.isml');

    // Work with a HashMap to pass the data to the template.
    var mailAttributes = new Map();
    mailAttributes.put('EmailMessage', 'Test Message');
    addFilesToMailAttributes(mailAttributes);

    var mail = new Mail();
    // Render the template with the data in the Hash
    var content = template.render(mailAttributes);

    mail.addTo('prem@yopmail.com');
    mail.setFrom('test@yopmail.com');
    mail.setSubject('Example Email');
    mail.setContent(content);

    res.json({
        success: mail.send().message,
        content: content.getText()
    });

    next();
});

module.exports = server.exports();