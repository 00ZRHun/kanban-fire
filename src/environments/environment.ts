// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* export const environment = {
  production: false
}; */
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/* // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6sMpNGXC-NmKTSyFspq5GsCwJon261D8",
  authDomain: "kanbanfire-e8e82.firebaseapp.com",
  projectId: "kanbanfire-e8e82",
  storageBucket: "kanbanfire-e8e82.appspot.com",
  messagingSenderId: "290227942129",
  appId: "1:290227942129:web:aabac3c71a69992a6e2f50",
  measurementId: "G-68NJY47TYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB6sMpNGXC-NmKTSyFspq5GsCwJon261D8',
    authDomain: 'kanbanfire-e8e82.firebaseapp.com',
    projectId: 'kanbanfire-e8e82',
    storageBucket: 'kanbanfire-e8e82.appspot.com',
    messagingSenderId: '290227942129',
    appId: '1:290227942129:web:aabac3c71a69992a6e2f50',
    measurementId: 'G-68NJY47TYL',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
