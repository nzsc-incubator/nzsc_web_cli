import { write2Ln } from '../io';
import { SUCCESS } from './helpers/consts';

const set = async (args, state) => {
  const [key, val] = args;
  state[key] = val;
  write2Ln('Assignment succeeded! state.' + key + ' = ' + val, SUCCESS);
};

export default set;
