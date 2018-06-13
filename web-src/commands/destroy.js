import { writeLn, write2Ln } from '../io';
import { A, B, ERROR, SUCCESS, PENDING } from './helpers/consts';
import clownkit from '../clownkit/index';

const destroy = async (args, state) => {
  let roomName = args[0];
  const { aOrB } = state;

  if (!roomName) {
    if (state.roomName === null) {
      write2Ln('You are not in a game.', ERROR);
      return;
    } else {
      roomName = state.roomName;
    }
  }

  if (![A, B].includes(aOrB)) {
    write2Ln('You are not in a game.', ERROR);
    return;
  }

  try {
    writeLn('Destroying game room ' + roomName + '...', PENDING);
    await clownkit.destroy(roomName, aOrB);
    state.roomName = null;
    state.aOrB = null;
    writeLn('Destroyed game room ' + roomName + '.', SUCCESS);
  } catch (e) {
    writeLn('Failed to destroy game room ' + roomName + '.', ERROR);
    if (e.isExpected) {
      writeLn('This is probably because somebody else is still in the room.');
    } else {
      writeLn('We don\'t know what happened. Sorry.');
    }
  } finally {
    writeLn('');
  }
};

export default destroy;
