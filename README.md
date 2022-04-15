# postingwebsite

This project utilizes VueJs to build a web application that allows users to post to a public form. The project uses user sign in and email confirmation with Firebase and passwords are hashed twice, client-side and through firebase. All posted data is encrypted clientside with EAS before being posted to Firebase database. This project also supports users updating and deleting their content from the site.



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


### Note: A firebase.js file is required to be configured to run this project, The format should be as follows:
To run this, you must create an account with firebase and start a database. Inside the database settings, there will be a text block to copy and pase into the firebase.js file. Make the nessesary edits to format the code below. The file should be placed in the src folder.

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

### Please Ensure All Dependencies in the Project are Installed
