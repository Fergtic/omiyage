import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'



const app = initializeApp(config);
const FieldValue  = getFirestore();
const storage = getStorage(app);


export { app, FieldValue, storage };
