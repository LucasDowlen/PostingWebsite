# postingwebsite

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
