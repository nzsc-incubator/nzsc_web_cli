import { writeLn, write2Ln } from '../io';
import { db, A, B, ERROR, SUCCESS, PENDING } from './helpers/consts';

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
      }).catch(() => {
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
      }).catch(() => {
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

export default delete_;
