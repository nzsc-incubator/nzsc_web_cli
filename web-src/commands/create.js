import { writeLn, write2Ln } from '../io';
import { A, ERROR, SUCCESS, PENDING } from './helpers/consts';
import clownkit from '../clownkit/index';

const create = async (args, state) => {
  if (!state.isLoggedIn) {
    write2Ln('Please login first.', ERROR);
    return;
  }

  const roomName = args[0];

  try {
    writeLn('Creating game room ' + roomName + '...', PENDING);
    await clownkit.create(roomName);
    state.roomName = roomName;
    state.aOrB = A;
    writeLn('Created game room ' + roomName + '.', SUCCESS);
  } catch (e) {
    writeLn('Failed to create game room ' + roomName + '.', ERROR);
    if (e.isExpected) {
      writeLn('This is probably because that name (' +  ') is already taken.');
    } else {
      console.log('Unexpected create error: ', e.raw);
      writeLn('We don\'t know what happened. Sorry.');
    }
  } finally {
    writeLn('');
  }

  try {
    writeLn('Adding listener...', PENDING);
    clownkit.observeRoom(roomName, (aPayload, bPayload) => {
      writeLn('Results are in:');
      writeLn('You chose ' + aPayload + '.');
      writeLn('Your opponent chose ' + bPayload + '.');
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

export default create;
