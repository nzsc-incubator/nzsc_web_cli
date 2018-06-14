import { writeLn, write2Ln } from '../io';
import { A, B, ERROR, SUCCESS, PENDING } from './helpers/consts';
import clownkit from '../clownkit';

const deposit = async ([payload], state) => {
  const { roomName, aOrB } = state;

  if (roomName === null || ![A, B].includes(aOrB)) {
    write2Ln('You are not in a game.', ERROR);
    return;
  }

  try {
    writeLn('Depositing ' + payload + '...', PENDING);
    await clownkit.deposit(roomName, aOrB, payload);
    writeLn('Deposited ' + payload + '.', SUCCESS);
  } catch (e) {
    writeLn('Failed to deposit ' + payload + '.', ERROR);
    if (e.isExpected) {
      writeLn('This is probably because you have already deposited this turn.');
    } else {
      writeLn('We don\'t know what happened. Sorry.');
    }
  } finally {
    writeLn('');
  }
};

export default deposit;
