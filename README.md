# Haven Frontend for Web and Desktop


Official Haven Frontend Monorepository for Haven Desktop and Haven Web Version.

**Main Libraries:** React, Redux, Electron, Styled Components

**Languages:** Typescript, Javascript

## Web

####Environments

* mainnet
* stagenet
* testnet

#### Build & Develop
 
1. Navigate to client folder
2. Build the app for the environment
3. Start the app

```bash
cd client
npm run build:web:testnet
npm run start:web:testnet
```

## Desktop

#### Build & Develop

1. Navigate to client folder
2. Build the app for the environment
3. Run Scripts to start the app in appropriate environment from root directory

```bash
cd client
npm run build:web:testnet
cd ../
sh ./sh/develop_testnet.sh
```


