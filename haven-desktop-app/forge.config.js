const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;
const {
  utils: { fromBuildIdentifier },
} = require("@electron-forge/core");

const ignoredPaths = [
  "^/src",
  ".gitignore",
  "tsconfig.json",
  "tslint.json",
  "yarn.lock",
  "forge.config.js",
  "^/haven-node",
  "^/icons",
];

const substituteEnvsForBuild = (
  buildPath,
  electronVersion,
  platform,
  arch,
  callback
) => {
  const envPath = path.resolve(buildPath, "dist", "env.js");
  let envContent = fs.readFileSync(envPath, { encoding: "utf8" });

  const envKeys = Object.keys(process.env);

  envKeys.forEach((envKey) => {
    envContent = envContent.replace(
      `process.env.${envKey}`,
      process.env[envKey]
    );
  });

  fs.writeFileSync(envPath, envContent);
  callback();
};

const copyTargetNodesToBuild = (
  buildPath,
  electronVersion,
  platform,
  arch,
  callback
) => {


  const netTypes = {
    '0': 'mainnet',
    '1': 'testnet',
    '2': 'stagenet'
  };


  const filter = (fileName) => {

    return (fileName.includes('.log')) === false;

  };


  const netType = netTypes[process.env.NET_TYPE_ID];


  fs.mkdirSync(path.resolve(buildPath, `./haven-node/${platform}/`), {
    recursive: true,
  });
  ncp(
      path.resolve(__dirname, `./haven-node/${platform}/${netType}/`),
      path.resolve(buildPath, `./haven-node/${platform}/${netType}/`), {filter},
      (err) => {
        if (err) {
          console.log(err);
        }

        console.log(`copied daemons for  ${platform} ${netType}`);
        callback();
      }
  );
};


module.exports = {
  packagerConfig: {
    executableName: "Haven",
    name: "Haven",
    ignore: ignoredPaths,
    afterCopy: [copyTargetNodesToBuild, substituteEnvsForBuild],
    icon: "./icons/icon",
    asar: {
      unpackDir: "haven-node/**",
    },
  },

  hooks: {readPackageJson: (value) => {

   //console.log(process);

    }},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Haven",
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {
        background: "./icons/dmg-bg.png",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {},
    },
    {
      name: "@electron-forge/maker-deb",
      config: {name:"haven", productName:"Haven"},
    },
  ],

  plugins: [["@electron-forge/plugin-auto-unpack-natives"]],

  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "haven-protocol-org",
          name: "haven-web-app",
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};
