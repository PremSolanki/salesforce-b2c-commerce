'use strict';

const jsConfigFn = require('./webpackconfigs/jsConfig');
const scssConfigFn = require('./webpackconfigs/scssConfig');


const defaultCartridgeList = [
        'app_custom_accel',
		'app_storefront_base',
		'plugin_newsletter',
		'app_stripe_sfra',
		'int_stripe_core',
		'int_stripe_sfra'
        // 'app_cartridge-1' // Update this with all the cartridges that needs to be compiled
    ];

module.exports = (env) => {
    const cartridgeList = env.cartridges && env.cartridges.trim() ? env.cartridges.split(',') : defaultCartridgeList;

    if (env.js) {
        const jsConfig = jsConfigFn(env, cartridgeList);
        return jsConfig;
    } else if (env.css) {
        const scssConfig = scssConfigFn(env, cartridgeList);
        return scssConfig;
    } else {
        const jsConfig = jsConfigFn(env, cartridgeList);
        const scssConfig = scssConfigFn(env, cartridgeList);

        return [jsConfig, scssConfig];
    }
};