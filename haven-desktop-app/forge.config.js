
module.exports = {
    packagerConfig: {name:'Haven', ignore:['^/src']},
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
]
};



