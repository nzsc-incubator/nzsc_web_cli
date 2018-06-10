import { write2Ln } from '../../io';
import { db, A, A_SEALED, B_SEALED, NONE_VIEWED, A_VIEWED, B_VIEWED, NONE_SEALED, ERROR, SUCCESS } from './consts';

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
