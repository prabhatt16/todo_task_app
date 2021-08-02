import firebase from 'firebase';

const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyA03jPQEX4jPpMu7NZUJR__1UGOhz7CSlc",
    authDomain: "todo-task-app-22b70.firebaseapp.com",
    projectId: "todo-task-app-22b70",
    storageBucket: "todo-task-app-22b70.appspot.com",
    messagingSenderId: "333840492229",
    appId: "1:333840492229:web:005e1a4f445a9dde3672ac",
    measurementId: "G-8VZ09P10RY"
});
const auth=firebase.auth();
const storage=firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export const db=firebaseApp.firestore();
export {auth,storage,provider};
