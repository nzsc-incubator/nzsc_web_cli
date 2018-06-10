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

const ERROR = 'terminal-error';
const SUCCESS = 'terminal-success';
const PENDING = 'terminal-pending';

const seal = async (id, aOrB) => {
  const guardianRef = db.collection('guardians').doc(id);
  try {
    await guardianRef.update({
      state: aOrB === A ? A_SEALED : B_SEALED,
    });
    write2Ln('Sealed first.', SUCCESS);
  } catch {
    try {
      await guardianRef.update({
        state: NONE_VIEWED,
      });
      write2Ln('Sealed second.', SUCCESS);
    } catch (e) {
      console.log('Unexpected sealing error: ', e);
      write2Ln('Failed to seal.', ERROR);
    }
  }
};

const acceptResults = async (id, aOrB) => {
  const guardianRef = db.collection('guardians').doc(id);
  try {
    await guardianRef.update({
      state: aOrB === A ? A_VIEWED : B_VIEWED,
    });
    write2Ln('Accepted first.', SUCCESS);
  } catch {
    try {
      await guardianRef.update({
        state: NONE_SEALED,
      });
      write2Ln('Accepted second.', SUCCESS);
    } catch (e) {
      console.log('Unexpected acceptance error: ', e);
      write2Ln('Failed to accept results.', ERROR);
    }
  }
};

export {
  seal,
  acceptResults,
};
