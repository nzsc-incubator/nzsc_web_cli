import firebase from './firebase';
import { write2Ln } from './io';

const db = firebase.firestore();

const A = 'A';
const B = 'B';

const NONE_CREATED = 0;
const A_CREATED = 1;
const B_CREATED = 2;
const NONE_SEALED = 3;
const A_SEALED = 4;
const B_SEALED = 5;
const NONE_VIEWED = 6;
const A_VIEWED = 7;
const B_VIEWED = 8;

const ERROR = {
  bg: '#111',
  text: '#C00',
};

const seal = async (id, aOrB) => {
  const guardianRef = db.collection('guardians').doc(id);
  try {
    await guardianRef.update({
      state: aOrB === A ? A_SEALED : B_SEALED,
    });
    write2Ln('Sealed.');
  } catch {
    try {
      await guardianRef.update({
        state: NONE_VIEWED,
      });
      write2Ln('Sealed.');
    } catch (e) {
      console.log('Unexpected sealing error: ', e);
      write2Ln('Failed to seal.');
    }
  }
};

export {
  seal,
};
