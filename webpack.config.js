const {
    DefinePlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin
} = require('webpack')

const APP_DIR = 'examples-preview'

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: {
        app: ['core-js/stable', 'regenerator-runtime/runtime', `./${APP_DIR}`]
    },
    stats: 'verbose',
    context: __dirname,
    output: {
        filename: APP_DIR + '-app.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: APP_DIR + '/public',
        disableHostCheck: true,
        host: 'localhost',
        hot: true,
        inline: true,
        port: 5050,
        stats: 'errors-warnings'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
}
