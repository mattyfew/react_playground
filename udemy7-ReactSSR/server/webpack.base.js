module.exports = {
    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',

                // Tells webpack to not run babel over files in certain directories
                exclude: /node_modules/,

                // Options passed along to the babel loader
                options: {
                    presets: [
                        'react', // takes JSX and turns them into normal JS function calls
                        'stage-0', // used for handeling async code
                                    // env - the master preset webpack uses - basically handles a lot
                                    // of transpile stuff
                        ['env', { targets: { browsers: ['last 2 versions'] }}]
                    ]
                }
            }
        ]
    }
}
