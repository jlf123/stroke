import firebase from 'firebase';
import { FIREBASE } from './config';

const config = {
    apiKey: FIREBASE.API_KEY,
    authDomain: FIREBASE.DOMAIN,
    databaseURL: FIREBASE.DB_URL,
    projectId: FIREBASE.PROJECT_ID,
    messagingSenderId: FIREBASE.SENDER_ID 
};

firebase.initializeApp(config);

export default firebase;