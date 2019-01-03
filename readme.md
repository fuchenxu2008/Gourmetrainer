# Gourmetrainer

## Prerequisite

* Node.js version 9.10.0
* NPM (installed with Node.js)
* Default server port `3333` free, can be changed in `/server/config/index.js`

## How to set up development environment

1. Run `git clone git@github.com:fuchenxu2008/Gourmetrainer.git` in `Terminal`. And run `cd Gourmetrainer` to enter project folder.
2. From project folder run `cd server/` and then `npm install` to install dependencies.
3. After dependencies having been installed, run `npm start` to start **server** program. Since the server program is a dameon process, following actions need a new tab of `Terminal`.
4. From project folder run `cd client/` and then `npm install` to install dependencies.
5. After dependencies having been installed, run `npm start` to start **client** program. Note that the client program is still a dameon process.
6. Before testing it with real device or simulator, please edit `/client/App.js` and change `${your_IP_address}` to your machine's IP address. (If using simulator only, `localhost` is also fine)

   ```javascript
   const client = new ApolloClient({
        uri: 'http://${your_IP_adress}:3333/graphql',
        cache,
        clientState: {
            defaults: {
            currentUser: null,
            },
        }
    });
   ```

7. Then you can either type `a` in the `client terminal` to start Android Simulator or use `Expo App` on your phone to scan the QR Code to test (Needs to be in the same LAN Network).

## Build standalone APK for Android

1. `cd client/` and Run `expo build:android` to publish the working project to Expo server to build.
2. After the build process is finished, download the APK file from website given in terminal.

## Publish change

Expo allows **OTA Update**, no need to rebuild for changes to take effect, just run `expo publish` from `client/` directory. After it's done, the next launch of the application will download the update **in the background** (might take a while), and will kick in the next time the application launches.