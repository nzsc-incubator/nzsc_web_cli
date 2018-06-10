import { writeLn, write2Ln, writeJson2Ln } from '../../io';
import { db, A, NONE_VIEWED, ERROR, SUCCESS, PENDING } from './consts';
import * as firehelpers from './firehelpers';

const addGuardianObserver = async (id, aOrB, state) => {
  const guardianRef = db.collection('guardians').doc(id);
  const avRef = db.collection('aVaults').doc(id);
  const bvRef = db.collection('bVaults').doc(id);

  guardianRef.onSnapshot(
    {
      includeMetadataChanges: true,
    },

    (guardianDoc) => {
      if (guardianDoc.metadata.hasPendingWrites || state.state === guardianDoc.data().state) {
        return;
      }

      const guardianData = guardianDoc.data();
      state.state = guardianData.state;
      // write2Ln('Guardian state is now: ' + guardianData.state);

      if (guardianData.state === NONE_VIEWED) {
        writeLn('Results are in...', PENDING);
        Promise.all([avRef.get(), bvRef.get()]).then(([aDoc, bDoc]) => {
          const aPayload = aDoc.data().payload;
          const bPayload = bDoc.data().payload;

          if (aOrB === A) {
            writeLn('You chose ' + aPayload, SUCCESS);
            write2Ln('Your opponent chose ' + bPayload, SUCCESS);

            state.game.process_choice('A', aPayload);
            state.game.process_choice('B', bPayload);
            const result = JSON.parse(state.game.get_phase());

            writeLn('You are A.');
            writeJson2Ln(result);
          } else {
            writeLn('You chose ' + bPayload, SUCCESS);
            write2Ln('Your opponent chose ' + aPayload, SUCCESS);

            state.game.process_choice('A', aPayload);
            state.game.process_choice('B', bPayload);
            const result = JSON.parse(state.game.get_phase());

            writeLn('You are B.');
            writeJson2Ln(result);
          }

          firehelpers.acceptResults(id, aOrB);
        }).catch((e) => {
          console.log('Unexpected result fetching error: ', e);
          write2Ln('Failed to get results.', ERROR);
        });
      }
    }
  );
};

export default addGuardianObserver;
