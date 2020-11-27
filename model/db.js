const admin = require('firebase-admin');
let serviceAccount = require('./it60-42-choen-savoey-59a3efed1682.json');


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

const db = admin.firestore();
const storage = admin.storage();

module.exports = {db,storage,};