import { writeLn, write2Ln } from '../io';
import { db, A, NONE_CREATED, A_CREATED, ERROR, SUCCESS, PENDING } from './helpers/consts';
import addGuardianObserver from './helpers/addGuardianObserver';
const create = async (args, state) => {
  if (state.uid === null) {
    write2Ln('Please login first.', ERROR);
    return;
  }

  const id = args[0];
  const guardianRef = db.collection('guardians').doc(id);
  const vaultRef = db.collection('aVaults').doc(id);

  guardianRef.set({
    state: NONE_CREATED
  }).then(() => {
    writeLn('Created guardian ' + id, SUCCESS);
    writeLn('Creating A-vault...', PENDING);

    vaultRef.set({
      owner: state.uid,
      payload: ''
    }).then(() => {
      writeLn('Created A-vault ' + id, SUCCESS);
      writeLn('Updating guardian...', PENDING);

      state.aOrB = A;
      state.id = id;

      guardianRef.update({
        state: A_CREATED
      }).then(() => {
        writeLn('Updated guardian.', SUCCESS);

        write2Ln('Listening for changes...', PENDING);
        addGuardianObserver(id, A, state);
      }).catch((e) => {
        console.log('Unexpected post-vault-creation guardian update error: ', e);
        writeLn('Failed to update guardian.', ERROR);
      });
    }).catch((e) => {
      console.log('Unexpected vault-creation error', e);
      write2Ln('Failed to create A-vault.');
    });
  }).catch(() => {
    writeLn('Failed to create guardian: ' + id, ERROR);
    write2Ln('This is probably because it already exists.');
  });

  writeLn('Creating guardian...', PENDING);
};

export default create;
