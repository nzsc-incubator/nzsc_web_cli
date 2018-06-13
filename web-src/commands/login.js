import { writeLn } from '../io';
import { ERROR, PENDING } from './helpers/consts';
import clownkit from '../clownkit/index';

const login = async (args, state) => {
  const isSuccessSilent = args[0] === 'silent-success';

  if (!isSuccessSilent) {
    writeLn('Logging in...', PENDING);
  }

  try {
    await clownkit.login();
    state.isLoggedIn = true;
  } catch {
    writeLn('Failed to login.', ERROR);
    writeLn('We don\'t know what happened. Sorry.');
  } finally {
    writeLn('');
  }
};

export default login;
