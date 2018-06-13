import { writeLn, writeJsonLn } from '../../io';
import { A, B } from './consts';

const createTurnEndListenerFor = (aOrB, state) => (aPayload, bPayload) => {
  if (![A, B].includes(aOrB)) {
    throw new TypeError('aOrB must be "A" or "B"');
  }

  writeLn('Results are in:');

  if (aOrB === A) {
    writeLn('You chose ' + aPayload + '.');
    writeLn('Your opponent chose ' + bPayload + '.');
    writeLn('');
    writeLn('Here is the current state of the game (You are A):');
  } else {
    writeLn('You chose ' + bPayload + '.');
    writeLn('Your opponent chose ' + aPayload + '.');
    writeLn('');
    writeLn('Here is the current state of the game (You are B):');
  }

  state.game.process_choice('A', aPayload);
  state.game.process_choice('B', bPayload);
  const result = JSON.parse(state.game.get_phase());

  writeJsonLn(result);
  writeLn('');
};

export default createTurnEndListenerFor;
