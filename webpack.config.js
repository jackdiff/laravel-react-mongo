var path = require('path');
var webpack = require('webpack');

var srcPath = path.join(__dirname, 'resources/js');
var buildPath = path.join(__dirname, 'public/js');


 module.exports = {
    entry: [path.join(srcPath, 'index.js')],
    output: {
        path: buildPath,
        filename: 'bundle.js',
    },
    resolve: {
        modules: [
            'sources', 'node_modules',
        ],
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/react', '@babel/env'],
                      plugins: [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                        ["@babel/plugin-transform-regenerator", {
                            "asyncGenerators": true,
                            "generators": true,
                            "async": true
                          }
                        ],
                        "@babel/plugin-transform-runtime"
                      ]
                    },
                }
            }
        ]
    }
 };