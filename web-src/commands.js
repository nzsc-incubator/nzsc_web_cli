import { writeLn, write2Ln, writeJsonLn, writeJson2Ln, read } from './io';
import firebase from './firebase';
import * as firehelpers from './firehelpers';
import help from './help';

// Constants

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

// Misc

const addGuardianObserver = async (id, aOrB, state) => {
  const guardianRef = db.collection('guardians').doc(id);
  const avRef = db.collection('aVaults').doc(id);
  const bvRef = db.collection('bVaults').doc(id);

  guardianRef.onSnapshot(
    {
      includeMetadataChanges: true,
    },

    (guardianDoc) => {
      if (guardianDoc.metadata.hasPendingWrites || state.state === guardianDoc.data().state) {
        return;
      }

      const guardianData = guardianDoc.data();
      state.state = guardianData.state;
      // write2Ln('Guardian state is now: ' + guardianData.state);

      if (guardianData.state === NONE_VIEWED) {
        writeLn('Results are in...', PENDING);
        Promise.all([avRef.get(), bvRef.get()]).then(([aDoc, bDoc]) => {
          const aPayload = aDoc.data().payload;
          const bPayload = bDoc.data().payload;

          if (aOrB === A) {
            writeLn('You chose ' + aPayload, SUCCESS);
            write2Ln('Your opponent chose ' + bPayload, SUCCESS);

            state.game.process_choice('A', aPayload);
            state.game.process_choice('B', bPayload);
            const result = JSON.parse(state.game.get_phase());

            writeLn('You are A.');
            writeJson2Ln(result);
          } else {
            writeLn('You chose ' + bPayload, SUCCESS);
            write2Ln('Your opponent chose ' + aPayload, SUCCESS);

            state.game.process_choice('A', aPayload);
            state.game.process_choice('B', bPayload);
            const result = JSON.parse(state.game.get_phase());

            writeLn('You are B.');
            writeJson2Ln(result);
          }

          firehelpers.acceptResults(id, aOrB);
        }).catch((e) => {
          console.log('Unexpected result fetching error: ', e);
          write2Ln('Failed to get results.', ERROR);
        });
      }
    }
  );
};

// Commands

const list = async (args, state) => {
  const guardiansRef = db.collection('guardians');
  guardiansRef.where('state', '==', A_CREATED).get().then(({ docs, }) => {
    if (docs.length > 0) {
      writeLn('Open game rooms:', SUCCESS);
      docs.forEach((doc) => {
        writeLn(doc.id);
        writeLn('');
      });
    } else {
      writeLn('There are no open game rooms.');
      write2Ln('You can create your own with "create <gameId>"');
    }
  }).catch((e) => {
    console.log('Unexpected list error: ', e);
    write2Ln('Failed to list game rooms.', ERROR);
  });
  writeLn('Fetching...', PENDING);
};

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
  }).catch((_e) => {
    writeLn('Failed to create guardian: ' + id, ERROR);
    write2Ln('This is probably because it already exists.');
  });

  writeLn('Creating guardian...', PENDING);
};

const set = async (args, state) => {
  const [key, val] = args;
  state[key] = val;
  write2Ln('Assignment succeeded! state.' + key + ' = ' + val, SUCCESS);
};

const get = async (args, state) => {
  const key = args[0];
  if (key === undefined) {
    writeJson2Ln(state);
  } else {
    write2Ln(state[key]);
  }
};

const delete_ = async (args, state) => {
  let id = args[0];

  if (!id) {
    if (state.id === null) {
      write2Ln('You are not in a game.', ERROR);
      return;
    } else {
      id = state.id;
    }
  }

  const guardianRef = db.collection('guardians').doc(id);

  if (state.aOrB === A) {
    const vaultRef = db.collection('aVaults').doc(id);

    vaultRef.delete().then(() => {
      writeLn('Deleted A-vault ' + id, SUCCESS);
      writeLn('Deleting guardian...', PENDING);

      guardianRef.delete().then(() => {
        write2Ln('Deleted guardian ' + id, SUCCESS);
      }).catch((_e) => {
        writeLn('Failed to delete guardian ' + id, ERROR);
        write2Ln('This is probably because somebody is still in the game room.');
      });
    }).catch((e) => {
      console.log('Unexpected deletion error: ', e);
      write2Ln('Failed to delete A-vault ' + id, ERROR);
    });

    writeLn('Deleting A-vault...', PENDING);
  } else if (state.aOrB === B) {
    const vaultRef = db.collection('bVaults').doc(id);

    vaultRef.delete().then(() => {
      writeLn('Deleted B-vault ' + id, SUCCESS);
      writeLn('Deleting guardian...', PENDING);

      guardianRef.delete().then(() => {
        write2Ln('Deleted guardian ' + id, SUCCESS);
      }).catch((_e) => {
        writeLn('Failed to delete guardian ' + id, ERROR);
        write2Ln('This is probably because somebody is still in the game room.');
      });
    }).catch((e) => {
      console.log('Unexpected deletion error: ', e);
      write2Ln('Failed to delete B-vault ' + id, ERROR);
    });

    writeLn('Deleting B-vault...', PENDING);
  } else {
    write2Ln('You are not in game room ' + id, ERROR);
  }
};
/*
const deleteGuardian = async (args, state) => {
  const id = args[0];
  const guardianRef = db.collection('guardians').doc(id);

  guardianRef.delete().then(() => {
    write2Ln('Deleted guardian: ' + id);
  }).catch((e) => {
    write2Ln('Failed to delete guardian: ' + id);
  });

  writeLn('Deleting guardian...');
};

const deleteAVault = async (args, state) => {
  const id = args[0];
  const vaultRef = db.collection('aVaults').doc(id);

  vaultRef.delete().then(() => {
    write2Ln('Deleted A-vault: ' + id);
  }).catch((e) => {
    write2Ln('Failed to delete A-vault: ' + id);
  });

  writeLn('Deleting A-vault...');
};

const deleteBVault = async (args, state) => {
  const id = args[0];
  const vaultRef = db.collection('bVaults').doc(id);

  vaultRef.delete().then(() => {
    write2Ln('Deleted B-vault: ' + id);
  }).catch((e) => {
    write2Ln('Failed to delete B-vault: ' + id);
  });

  writeLn('Deleting B-vault...');
};
*/
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
  }).catch((_e) => {
    writeLn('Failed to join: ' + id, ERROR);
    write2Ln('This is probably because the game either is full or does not exist.');
  });

  writeLn('Joining...', PENDING);
};

const deposit = async ([payload], state) => {
  const { id, aOrB } = state;

  if (id === null || aOrB === null) {
    write2Ln('You are not in a game.', ERROR);
    return;
  }

  const guardianRef = db.collection('guardians').doc(id);
  const vaultRef = aOrB === A
    ? db.collection('aVaults').doc(id)
    : db.collection('bVaults').doc(id);

  try {
    writeLn('Depositing...', PENDING);

    await vaultRef.update({
      payload,
    });

    writeLn('Successfully deposited ' + payload, SUCCESS);
    writeLn('Sealing...', PENDING);

    await firehelpers.seal(id, aOrB);
  } catch (e) {
    writeLn('Failed to deposit ' + payload, ERROR);
    write2Ln('This is probably because you sealed your vault.');
  }
};

const helpCommand = async (args, state) => {
  const [commandName] = args;
  if (commandName) {
    help.withCommand(commandName);
  } else {
    help.listCommands();
  }
};

export {
  list,
  login,
  create,
  get,
  set,
  delete_,
  join,
  deposit,
  helpCommand as help,
};
