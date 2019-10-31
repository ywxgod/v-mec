const TerserPlugin = require('terser-webpack-plugin');
const config = require('./config');

let {filename, outDir, entryDir} = config;

module.exports = (params)=>{
    let {env} = params;
    let isProd = env === 'prod';
    let mode = isProd?'production':'development';
    let config = {
        mode,
        entry: entryDir,
        output: {
            filename,
            libraryTarget: 'umd',
            path: outDir
        },
        module:{
            rules:[
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        externals:{
            axios:{
                commonjs: 'axios',
                commonjs2: 'axios',
                umd: 'axios',
                root: 'axios'
            }
        }
    };
    if(!isProd){
        config.devtool = 'source-map';
    }else{
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()],
        }
    }

    return config;

}