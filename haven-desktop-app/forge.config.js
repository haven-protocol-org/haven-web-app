const fs = require("fs");
const path = require('path');
const ncp = require('ncp').ncp;
const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');


const ignoredPaths = ['^/src', '.gitignore', 'tsconfig.json',
    'tslint.json', 'yarn.lock','forge.config.js', '^/haven-node', '^/icons'];






const substituteEnvsForBuild = (buildPath, electronVersion,platform, arch, callback) => {

    const envPath = path.resolve(buildPath, 'dist', 'env.js');
    let envContent = fs.readFileSync(envPath, {encoding:'utf8'});

    const envKeys = Object.keys(process.env);

    envKeys.forEach( envKey => {envContent = envContent.replace(`process.env.${envKey}`, process.env[envKey]);});

    fs.writeFileSync(envPath, envContent);
    callback();

};




const copyTargetNodesToBuild = (buildPath, electronVersion,platform, arch, callback) => {


    fs.mkdirSync( path.resolve( buildPath, `./haven-node/${platform}/`), {recursive:true});
    ncp(path.resolve(__dirname, `./haven-node/${platform}/`), path.resolve( buildPath, `./haven-node/${platform}/`), (err) =>{

        if (err){
            console.log(err);
        }

        console.log('copied node for ' + platform);
        callback();
    });

};


module.exports = {


    packagerConfig:{ name:'Haven', ignore:ignoredPaths, afterCopy:[copyTargetNodesToBuild, substituteEnvsForBuild], icon:'./icons/haven_icon', asar:{
        unpackDir:'haven-node/**'
    }},


    makers: [
    {
        name: "@electron-forge/maker-squirrel",
        config: {
            name: "Haven"
        }
    },
    {
        name: "@electron-forge/maker-zip",
        platforms: [
            "darwin"
        ]
    },
    {
        name: "@electron-forge/maker-deb",
        config: {}
    },
    {
        name: "@electron-forge/maker-rpm",
        config: {}
    }
    ],

    plugins: [
        ['@electron-forge/plugin-auto-unpack-natives']
    ],

    publishers:[{
        name: '@electron-forge/publisher-github',
        config: {
            repository: {
                owner: 'haven-protocol-org',
                name: 'haven-web-app'
            },
            prerelease: true,
            draft:true
        }
    }]
};


