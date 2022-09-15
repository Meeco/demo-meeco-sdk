# demo-meeco-sdk

demo use of meeco sdk to retrieve items &amp; its decrypted slots values and tags

## Configure

open `./src/index.ts` file
update

* subscriptionKey
* passphrase
* secret

## Usage - Command line node

```
npm install 
npm run build
node dist/main.js

```

## Usage - browser

 Note: there is a bug in @meeco/SDK, therefor workaround needed, to compile browser bundle.

* naviate to `node_modules/@meeco/sdk/package.json:9:13`
* update `index.esm.js` to `index.es.js`

```
npm install 
npm run start

```

open browser & navigate to `localhost:1234`
view browser console
