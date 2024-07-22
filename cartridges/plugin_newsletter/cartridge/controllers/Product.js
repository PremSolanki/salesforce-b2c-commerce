'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    if (typeof viewData.product !== 'undefined') {
        var productData = viewData.product;
            
        res.setViewData(viewData);
    }
    next();
});


module.exports = server.exports();
