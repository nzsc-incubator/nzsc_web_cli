import { writeLn, write2Ln, writeJsonLn, writeJson2Ln, read } from './io';
import firebase from './firebase';

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

// Misc

const addGuardianObserver = (guardianRef, id) => {
  guardianRef.onSnapshot((guardianDoc) => {
    const guardianData = guardianDoc.data();
    write2Ln('Guardian state is now: ' + guardianData.state);
  });
};

// Commands

const login = (_args, state) => {
  firebase.auth().signInAnonymously().catch((error) => {
    write2Ln('Failed to sign in.');
    console.log(error);
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user === null) {
      write2Ln('You are not signed in yet...');
    } else {
      state.uid = user.uid;
      write2Ln('Your uid is: ' + user.uid);
    }
  });
};

const create = (args, state) => {
  if (state.uid === null) {
    write2Ln('Please login first.');
    return;
  }

  const id = args[0];
  const guardianRef = db.collection('guardians').doc(id);
  const vaultRef = db.collection('aVaults').doc(id);

  guardianRef.set({
    state: NONE_CREATED
  }).then(() => {
    writeLn('Created guardian: ' + id);
    writeLn('Creating A-vault...');

    vaultRef.set({
      owner: state.uid,
      payload: ''
    }).then(() => {
      writeLn('Created A-vault: ' + id);
      writeLn('Updating guardian...');

      state.aOrB = A;
      state.id = id;

      guardianRef.update({
        state: A_CREATED
      }).then(() => {
        writeLn('Updated guardian.');

        write2Ln('Listening for changes...');
        addGuardianObserver(guardianRef, id);
      }).catch((e) => {
        writeLn('Failed to update guardian.');
      });
    }).catch((e) => {
      write2Ln('Failed to create A-vault: ' + id);
    });
  }).catch((e) => {
    write2Ln('Failed to create guardian: ' + id);
  });

  writeLn('Creating guardian...');
};

const set = (args, state) => {
  const [key, val] = args;
  state[key] = val;
  write2Ln('Assignment succeeded! state.' + key + ' = ' + val);
};

const get = (args, state) => {
  const key = args[0];
  if (key === undefined) {
    writeJson2Ln(state);
  } else {
    write2Ln(state[key]);
  }
};

const delete_ = (args, state) => {
  let id = args[0];

  if (!id) {
    if (state.id === null) {
      write2Ln('You are not associated with a game.');
      return;
    } else {
      id = state.id;
    }
  }

  const guardianRef = db.collection('guardians').doc(id);

  if (state.aOrB === A) {
    const vaultRef = db.collection('aVaults').doc(id);

    vaultRef.delete().then(() => {
      writeLn('Deleted A-vault: ' + id);
      writeLn('Deleting guardian...');

      guardianRef.delete().then(() => {
        write2Ln('Deleted guardian: ' + id);
      }).catch((e) => {
        write2Ln('Failed to delete guardian: ' + id);
      });
    }).catch((e) => {
      write2Ln('Failed to delete A-vault: ' + id);
    });

    writeLn('Deleting A-vault...');
  } else if (state.aOrB === B) {
    const vaultRef = db.collection('bVaults').doc(id);

    vaultRef.delete().then(() => {
      writeLn('Deleted B-vault: ' + id);
      writeLn('Deleting guardian...');

      guardianRef.delete().then(() => {
        write2Ln('Deleted guardian: ' + id);
      }).catch((e) => {
        write2Ln('Failed to delete guardian: ' + id);
      });
    }).catch((e) => {
      write2Ln('Failed to delete B-vault: ' + id);
    });

    writeLn('Deleting B-vault...');
  } else {
    write2Ln('You are not associated with ' + id);
  }
};

const deleteGuardian = (args, state) => {
  const id = args[0];
  const guardianRef = db.collection('guardians').doc(id);

  guardianRef.delete().then(() => {
    write2Ln('Deleted guardian: ' + id);
  }).catch((e) => {
    write2Ln('Failed to delete guardian: ' + id);
  });

  writeLn('Deleting guardian...');
};

const deleteAVault = (args, state) => {
  const id = args[0];
  const vaultRef = db.collection('aVaults').doc(id);

  vaultRef.delete().then(() => {
    write2Ln('Deleted A-vault: ' + id);
  }).catch((e) => {
    write2Ln('Failed to delete A-vault: ' + id);
  });

  writeLn('Deleting A-vault...');
};

const deleteBVault = (args, state) => {
  const id = args[0];
  const vaultRef = db.collection('bVaults').doc(id);

  vaultRef.delete().then(() => {
    write2Ln('Deleted B-vault: ' + id);
  }).catch((e) => {
    write2Ln('Failed to delete B-vault: ' + id);
  });

  writeLn('Deleting B-vault...');
};

const join = (args, state) => {
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
    writeLn('Successfully joined: ' + id);
    writeLn('Updating guardian...');

    state.id = id;
    state.aOrB = B;

    guardianRef.update({
      state: NONE_SEALED,
    }).then(() => {
      writeLn('Updated guardian.');
      write2Ln('Listening for changes...');

      addGuardianObserver(guardianRef, id);
    }).catch((e) => {
      write2Ln('Failed to update guardian.');
    });
  }).catch((e) => {
    write2Ln('Failed to join: ' + id);
  });

  writeLn('Joining...');
};

const deposit = (args, state) => {
  const payload = args[0];
  const { id, aOrB } = state;

  if (id === null || aOrB === null) {
    write2Ln('You are not associated with a game.');
    return;
  }

  const guardianRef = db.collection('guardians').doc(id);
  const vaultRef = aOrB === A
    ? db.collection('aVaults').doc(id)
    : db.collection('bVaults').doc(id);

  vaultRef.update({
    payload,
  }).then(() => {
    writeLn('Successfully deposited ' + payload + ' in ' + id);
    writeLn('Sealing...');

    guardianRef.get().then((guardianDoc) => {
      const guardianData = guardianDoc.data();
      if (guardianData.state === NONE_SEALED) {
        guardianRef.update({
          state: aOrB === A ? A_SEALED : B_SEALED,
        }).then(() => {
          write2Ln('Successfully sealed ' + id);

          const unsubscribe = guardianRef.onSnapshot((guardianDoc) => {
            if (guardianDoc.data().state !== NONE_VIEWED) {
              return;
            }

            unsubscribe();

            writeLn('Results are in!');
            const aVaultRef = db.collection('aVaults').doc(id);
            const bVaultRef = db.collection('bVaults').doc(id);
            const waitForBothToFinish = Promise.all([aVaultRef.get(), bVaultRef.get()]);
            waitForBothToFinish.then(([aDoc, bDoc]) => {
              if (state.aOrB === A) {
                writeLn('You chose ' + aDoc.data().payload);
                writeLn('Your opponent chose ' + bDoc.data().payload);
              } else {
                writeLn('You chose ' + bDoc.data().payload);
                writeLn('Your opponent chose ' + aDoc.data().payload);
              }

              writeLn('Updating guardian...');

              guardianRef.get().then((guardianDoc) => {
                if (guardianDoc.data().state === NONE_VIEWED) {
                  guardianRef.update({
                    state: state.aOrB === A ? A_VIEWED : B_VIEWED,
                  }).then(() => {
                    write2Ln('Updated guardian.');
                  }).catch((e) => {
                    write2Ln('Failed to update guardian.');
                  });
                } else {
                  guardianRef.update({
                    state: NONE_SEALED,
                  }).then(() => {
                    write2Ln('Updated guardian.');
                  }).catch((e) => {
                    write2Ln('Failed to update guardian.');
                  });
                }
              }).catch((e) => {
                write2Ln('Failed to update guardian.');
              });
            }).catch((e) => {
              console.log(e);
              write2Ln('Failed to read vaults.');
            });
          });
        }).catch(() => {
          write2Ln('Failed to seal ' + id);
        });
      } else {
        guardianRef.update({
          state: NONE_VIEWED,
        }).then(() => {
          write2Ln('Successfully sealed ' + id);

          writeLn('Results are in!');
          const aVaultRef = db.collection('aVaults').doc(id);
          const bVaultRef = db.collection('bVaults').doc(id);
          const waitForBothToFinish = Promise.all([aVaultRef.get(), bVaultRef.get()]);
          waitForBothToFinish.then(([aDoc, bDoc]) => {
            if (state.aOrB === A) {
              writeLn('You chose ' + aDoc.data().payload);
              writeLn('Your opponent chose ' + bDoc.data().payload);
            } else {
              writeLn('You chose ' + bDoc.data().payload);
              writeLn('Your opponent chose ' + aDoc.data().payload);
            }

            writeLn('Updating guardian...');

            guardianRef.get().then((guardianDoc) => {
              if (guardianDoc.data().state === NONE_VIEWED) {
                guardianRef.update({
                  state: state.aOrB === A ? A_VIEWED : B_VIEWED,
                }).then(() => {
                  write2Ln('Updated guardian.');
                }).catch((e) => {
                  write2Ln('Failed to update guardian.');
                });
              } else {
                guardianRef.update({
                  state: NONE_SEALED,
                }).then(() => {
                  write2Ln('Updated guardian.');
                }).catch((e) => {
                  write2Ln('Failed to update guardian.');
                });
              }
            }).catch((e) => {
              write2Ln('Failed to update guardian.');
            });
          }).catch((e) => {
            console.log(e);
            write2Ln('Failed to read vaults.');
          });
        }).catch(() => {
          write2Ln('Failed to seal ' + id);
        });
      }
    }).catch((e) => {
      write2Ln('Failed to seal ' + id);
    });
  }).catch((e) => {
    write2Ln('Failed to deposit ' + payload + ' in ' + id);
  });

  writeLn('Depositing...');
};

export {
  login,
  create,
  get,
  set,
  delete_,
  deleteGuardian,
  deleteAVault,
  deleteBVault,
  join,
  deposit,
};
