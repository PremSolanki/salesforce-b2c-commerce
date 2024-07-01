const path = require('path');
const webpack = require('webpack');
const getEntries = require('./utils/entryPoint');

const jsConfigFn = function (env, cartridgeList) {

    const jsConfig = {
        entry: getEntries({
            cartridgeList: cartridgeList,
            srcExt: 'js',
            destExt: 'js',
            subFolder: false
        }),
        mode: 'development',//env.WEBPACK_WATCH ? 'development' : 'production',
        devtool: env.WEBPACK_WATCH ? 'eval' : false,
        output: {
            filename: '[name].js',
            path: path.resolve(process.cwd(), './'),
        },
        module: {
            rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }]
        },
         plugins: [
            new webpack.ProgressPlugin(),
        ],
        resolve: {
            alias: {
				base: path.resolve(process.cwd(), 'cartridges/app_storefront_base/cartridge/client/default/js/'),
            },
        },
    };

    return jsConfig;
};

module.exports = jsConfigFn;