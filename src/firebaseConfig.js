// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,

// };

const firebaseConfig = {
  apiKey: "AIzaSyClgO-zNDDwXDCPef5mkB9Je-w2eThJheM",
  authDomain: "ads-network-26f41.firebaseapp.com",
  projectId: "ads-network-26f41",
  storageBucket: "ads-network-26f41.appspot.com",
  messagingSenderId: "54522853234",
  appId: "1:54522853234:web:df34b6745a8b8e85ca0feb",
  measurementId: "G-EBTDG8S7V0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };