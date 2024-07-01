const path = require('path');
const webpack = require('webpack');
const getEntries = require('./utils/entryPoint');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const svgConfigFn = function (env, cartridgeList) {

    const svgConfig = {
        entry: getEntries({
            cartridgeList: cartridgeList,
            srcExt: 'svg',
            destExt: 'svg',
            subFolder: false
        }),
        mode: env.WEBPACK_WATCH ? 'development' : 'production',
        devtool: env.WEBPACK_WATCH ? 'eval' : false,
        output: {
            filename: '[name].svg',
            path: path.resolve(process.cwd(), './'),
        },
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                publicPath: __webpack_public_path__,
                                spriteFilename: 'svg-sprite.isml'
                            }
                        }
                    ]
                },
            ]
        },
         plugins: [
            new webpack.ProgressPlugin(),
            new SpriteLoaderPlugin({
                plainSprite: true
            }),
            new ReplaceInFileWebpackPlugin([{
                dir: __webpack_public_path__,
                files: ['svg-sprite.isml'],
                rules: [{
                    search: /#/g,
                    replace: '${"#"}'
                }]
            }])
        ]
    };

    return svgConfig;
};

module.exports = svgConfigFn;