import { writeLn, write2Ln } from '../io';
import { db, NONE_SEALED, B, ERROR, SUCCESS, PENDING } from './helpers/consts';
import addGuardianObserver from './helpers/addGuardianObserver';

const join = async (args, state) => {
  if (state.uid === null) {
    write2Ln('Please login first.');
    return;
  }

  const id = args[0];
  const guardianRef = db.collection('guardians').doc(id);
  const vaultRef = db.collection('bVaults').doc(id);

  vaultRef.set({
    owner: state.uid,
    payload: ''
  }).then(() => {
    writeLn('Successfully joined ' + id, SUCCESS);
    writeLn('Updating guardian...', PENDING);

    state.id = id;
    state.aOrB = B;

    guardianRef.update({
      state: NONE_SEALED,
    }).then(() => {
      writeLn('Updated guardian.', SUCCESS);
      write2Ln('Listening for changes...', PENDING);

      addGuardianObserver(id, B, state);
    }).catch((e) => {
      console.log('Unexpected post-bvault-creation guardian-update error:', e);
      write2Ln('Failed to update guardian.', ERROR);
    });
  }).catch(() => {
    writeLn('Failed to join: ' + id, ERROR);
    write2Ln('This is probably because the game either is full or does not exist.');
  });

  writeLn('Joining...', PENDING);
};

export default join;
