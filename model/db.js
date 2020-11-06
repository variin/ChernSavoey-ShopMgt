const admin = require('firebase-admin');
// const firestoreService = require('firestore-export-import');
let serviceAccount = require('./it60-42-choen-savoey-59a3efed1682.json');

// import "firebase/storage";;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyDiLRSKZJU8F5UhTFHmMyHa0qB1CAzMuLw",
  authDomain: "it60-42-choen-savoey.firebaseapp.com",
  databaseURL: "https://it60-42-choen-savoey.firebaseio.com",
  projectId: "it60-42-choen-savoey",
  storageBucket: "it60-42-choen-savoey.appspot.com",
  messagingSenderId: "208922727243",
  appId: "1:208922727243:web:45cb03e5d2eebb8a948ece",
  measurementId: "G-0KGMXHYKEJ"
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.FIRESTORE_DATABASE,
//   storageBucket: process.env.STORAGE_BUCKET,
// });


// firestoreService
//   .backups(['store', 'users']) // Array of collection's name is OPTIONAL
//   .then((collections) => {
//     // You can do whatever you want with collections
//     console.log(JSON.stringify(collections));
//   });

const db = admin.firestore();
const storage = admin.storage();

module.exports = {db,storage,};