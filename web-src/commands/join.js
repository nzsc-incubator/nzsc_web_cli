import { writeLn, write2Ln } from '../io';
import { B, ERROR, SUCCESS, PENDING } from './helpers/consts';
import clownkit from '../clownkit/index';

const join = async (args, state) => {
  if (!state.isLoggedIn) {
    write2Ln('Please login first.');
    return;
  }

  const roomName = args[0];

  try {
    writeLn('Joining ' + roomName + '...', PENDING);
    await clownkit.join(roomName);
    state.roomName = roomName;
    state.aOrB = B;
    // TODO listeners
    writeLn('Joined ' + roomName + '.', SUCCESS);
  } catch (e) {
    writeLn('Failed to join ' + roomName + '.', ERROR);
    if (e.isExpected) {
      writeLn('This is probably because the game room does not exist.');
      writeLn('It is also possible that the game room exists, but is full.');
      writeLn('You can create your own game room with "create <gameRoomName>".');
    } else {
      writeLn('We don\'t know what happened. Sorry.');
    }
  } finally {
    writeLn('');
  }

  try {
    writeLn('Adding listener...', PENDING);
    clownkit.observeRoom(roomName, (aPayload, bPayload) => {
      writeLn('Results are in:');
      writeLn('You chose ' + bPayload + '.');
      writeLn('Your opponent chose ' + aPayload + '.');
      writeLn('');
    });
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
