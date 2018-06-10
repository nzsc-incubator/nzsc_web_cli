import firebase from '../firebase';
import { write2Ln } from '../io';
import { ERROR, PENDING } from './helpers/consts';

const login = async (args, state) => {
  firebase.auth().signInAnonymously().catch((error) => {
    console.log('Unexpected sign-in error:', error);
    write2Ln('Failed to sign in.', ERROR);
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user === null) {
      if (args[0] !== 'silent-success') {
        write2Ln('You are not signed in yet...', PENDING);
      }
    } else {
      state.uid = user.uid;
      if (args[0] !== 'silent-success') {
        write2Ln('Your uid is: ' + user.uid);
      }
    }
  });
};

export default login;
