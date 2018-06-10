import { writeLn, write2Ln } from '../io';
import { db, A, ERROR, SUCCESS, PENDING } from './helpers/consts';
import * as firehelpers from './helpers/firehelpers';

const deposit = async ([payload], state) => {
  const { id, aOrB } = state;

  if (id === null || aOrB === null) {
    write2Ln('You are not in a game.', ERROR);
    return;
  }

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

export default deposit;
