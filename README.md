# Haven Frontend for Web and Desktop


Official Haven Frontend Monorepository for Haven Desktop and Haven Web Version.

**Main Libraries:** React, Redux, Electron, Styled Components

**Languages:** Typescript, Javascript

## Web
#### Environments

* mainnet
* stagenet
* testnet

#### Build & Develop
 
1. Navigate to client folder
2. Build the app for given environment
3. Start the app for given environment 

```bash
cd client
npm run build:web:testnet
npm run start:web:testnet
```

## Desktop

#### Build 

1. Navigate to client folder
2. Build the app for the environment

```bash
cd client
npm run build:desktop:testnet
```

To build the final desktop build

```bash
sh ./sh/make_testnet.sh
```

#### Develop 

1. Run start script to prepare client
2. Start the build by executing shell script

```bash
npm run start:desktop:testnet
cd ../
sh ./sh/develop_testnet.sh
```


