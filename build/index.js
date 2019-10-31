const path = require('path');
const webpack = require('webpack');
const promisify = require('util').promisify;
const queryString = require('querystring');
const configGetter = require('./webpack.config');
const config = require('./config');
const rimraf = require('rimraf');

let args = process.argv[2];
let params = queryString.decode(args);
let outDir = config.outDir;
let webpackConfig = configGetter(params);

compile();

async function compile(){
    try{
        await promisify(rimraf)(`${outDir}/**/*`);
        let stats = await promisify(webpack)(webpackConfig);
        console.log(stats.toString({colors: true}));
    }catch(err){
        console.log(err);
    }
    
}