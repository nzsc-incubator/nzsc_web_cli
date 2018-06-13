import { writeLn } from '../io';
import { B, ERROR, SUCCESS, PENDING } from './helpers/consts';
import createTurnEndListenerFor from './helpers/createTurnEndListenerFor';
import clownkit from '../clownkit/index';

const join = async (args, state) => {
  if (!state.isLoggedIn) {
    writeLn('Please login first.');
    writeLn('');
    return;
  }

  const roomName = args[0];

  try {
    writeLn('Joining ' + roomName + '...', PENDING);
    await clownkit.join(roomName);
    state.roomName = roomName;
    state.aOrB = B;
    writeLn('Joined ' + roomName + '.', SUCCESS);
    writeLn('');
  } catch (e) {
    writeLn('Failed to join ' + roomName + '.', ERROR);
    if (e.isExpected) {
      writeLn('This is probably because the game room does not exist.');
      writeLn('It is also possible that the game room exists, but is full.');
      writeLn('You can create your own game room with "create <gameRoomName>".');
    } else {
      writeLn('We don\'t know what happened. Sorry.');
    }
    writeLn('');
    return;
  }

  try {
    writeLn('Adding listener...', PENDING);
    clownkit.onTurnEnd(roomName, createTurnEndListenerFor(B, state, roomName));
    writeLn('Added listener.', SUCCESS);
  } catch (e) {
    console.log('Unexpected create error: ', e.raw);
    writeLn('Failed to add listener.', ERROR);
    writeLn('We don\'t know what happened. Sorry.');
  } finally {
    writeLn('');
  }
};

export default join;
