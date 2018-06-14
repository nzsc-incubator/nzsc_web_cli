import { writeLn } from '../io';
import { ERROR, SUCCESS, PENDING } from './helpers/consts';
import clownkit from '../clownkit';

const list = async () => {
  try {
    writeLn('Fetching open game rooms...', PENDING);
    const gameRoomNames = await clownkit.list();
    writeLn('Fetched open game rooms.', SUCCESS);

    if (gameRoomNames.length > 0) {
      writeLn('Open game room names:');
      gameRoomNames.forEach((name) => {
        writeLn('\t' + name);
      });
    } else {
      writeLn('There are no open game rooms right now.');
      writeLn('You can create your own game room by typing "create <gameRoomName>".');
    }
  } catch {
    writeLn('Failed to fetch open game rooms.', ERROR);
    writeLn('We don\'t know what happened. Sorry.');
  } finally {
    writeLn('');
  }
};

export default list;
