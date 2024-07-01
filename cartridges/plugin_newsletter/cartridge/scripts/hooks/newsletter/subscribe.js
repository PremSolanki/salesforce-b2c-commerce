'use strict';

/**
 * EmailSubscribe-Subscribe : The EmailSubscribe-Subscribe enpoint allows the shopper to submit their eamil address to be added to a mailing list. OOB SFRA does not have a mailing list feature however this endpoint call a hook would allow for a customer to easily allow for custiomization
 * @name Base/EmailSubscribe-Subscribe
 * @function
 * @memberof EmailSubscribe
 * @param {Object} args - email address of subscriber.
 */
function subscribe(args) {
    var email = args;
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    Transaction.wrap(function () {
        CustomObjectMgr.createCustomObject('NewsletterSubscription', email);   
    });
}
exports.subscribe = subscribe;