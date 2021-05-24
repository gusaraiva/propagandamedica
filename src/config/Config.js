import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBrbumv0VYGUL4p4G2VN9_VADKZlvaO3Sc",
  authDomain: "prop-medica-online.firebaseapp.com",
  databaseURL: "https://prop-medica-online.firebaseio.com",
  projectId: "prop-medica-online",
  storageBucket: "",
  messagingSenderId: "287794890323",
  appId: "1:287794890323:web:09999326d300caa7"
};

 const config =  firebase.initializeApp(firebaseConfig);

  export default config;

  