# postingwebsite

This project is a webiste that allows users to make/sign in to accounts, post, and respond to other users.
It also supports editing features and uses firebase as the backend.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Note: A firebase.js file will have to be configured to run this project, The format should be as follows:
To run this, you must create an account with firebase and start a database. Inside the database settings, there
will be a text block to copy and pase into the firebase.js file. Then just make the nessesary edits so it looks
like the code below.

```

import firebase from 'firebase/app';
import 'firebase/firestore';

const fireBaseApp = firebase.initializeApp({
    apiKey: "*****",
    authDomain: "*****",
    projectId: "*****",
    storageBucket: "*****",
    messagingSenderId: "*****",
    appId: "*****",
    measurementId: "*****",
});

const db = fireBaseApp.firestore();

export { db };

```


### Link this project to your firebase account and fill the inilization fields.
