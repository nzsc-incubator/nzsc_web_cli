import { writeLn, write2Ln } from '../io';
import { db, A_CREATED, ERROR, SUCCESS, PENDING } from './helpers/consts';

const list = async () => {
  const guardiansRef = db.collection('guardians');
  guardiansRef.where('state', '==', A_CREATED).get().then(({ docs, }) => {
    if (docs.length > 0) {
      writeLn('Open game rooms:', SUCCESS);
      docs.forEach((doc) => {
        writeLn('\t' + doc.id);
      });
      writeLn('');
    } else {
      writeLn('There are no open game rooms.');
      write2Ln('You can create your own with "create <gameRoomName>"');
    }
  }).catch((e) => {
    console.log('Unexpected list error: ', e);
    write2Ln('Failed to list game rooms.', ERROR);
  });
  writeLn('Fetching...', PENDING);
};

export default list;
