import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAWSlYP3y5yWCoyUwKQ87c3RDhekeZbxHk",
    authDomain: "my-social-media-app-ca073.firebaseapp.com",
    databaseURL: "https://my-social-media-app-ca073-default-rtdb.firebaseio.com",
    projectId: "my-social-media-app-ca073",
    storageBucket: "my-social-media-app-ca073.appspot.com",
    messagingSenderId: "536081217829",
    appId: "1:536081217829:web:26601aead092cfb8d682cc",
    measurementId: "G-H8T98JQ08J"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {
    db,
    auth,
    storage,
}