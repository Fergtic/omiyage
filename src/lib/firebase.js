import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'




const config = {
    apiKey: "AIzaSyDeJoqdX5iIiUCTWAyHDHOgUiJ1sUvh2ww",
    authDomain: "anon2-403d0.firebaseapp.com",
    projectId: "anon2-403d0",
    storageBucket: "anon2-403d0.appspot.com",
    messagingSenderId: "1073586946573",
    appId: "1:1073586946573:web:215119d0b857700b264b44"
};

const app = initializeApp(config);
const FieldValue  = getFirestore();
const storage = getStorage(app);


export { app, FieldValue, storage };