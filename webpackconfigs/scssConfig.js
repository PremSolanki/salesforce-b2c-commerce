const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getEntries = require('./utils/entryPoint');

const scssConfigFn = function (env, cartridgeList) {

    const scssConfig = {
        entry: getEntries({
            cartridgeList: cartridgeList,
            srcExt: 'scss',
            destExt: 'css',
            exclude: /\/_.+[.]scss$/,
            subFolder: true
        }),
        mode: env.WEBPACK_WATCH ? 'development' : 'production',
        devtool: env.WEBPACK_WATCH ? 'eval' : false,
        output: {
            path: path.resolve(process.cwd(), './'),
        },
        module: {
            rules: [{
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            importLoaders: 2,
                        }
                    },
                    'postcss-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [
                                    path.resolve('node_modules'),
                                    path.resolve('node_modules/flag-icon-css/sass')
                                ],
                            },
                        },
                    },
                ],
            },{
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                type: "asset",
            }]
        },
         plugins: [
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({filename: '[name].css'}),
        ],
        resolve: {
            alias: {
                base: path.resolve(process.cwd(), 'cartridges/app_storefront_base/cartridge/client/default/scss/'),
            },
        },
    };

    return scssConfig;
};

module.exports = scssConfigFn;