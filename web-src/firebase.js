import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDf4-lOD9WulQ28HGLIIibkmVcr-hnjDC4",
  authDomain: "nzsc2p.firebaseapp.com",
  databaseURL: "https://nzsc2p.firebaseio.com",
  projectId: "nzsc2p",
  storageBucket: "nzsc2p.appspot.com",
  messagingSenderId: "736929435180"
};

firebase.initializeApp(config);

export default firebase;
