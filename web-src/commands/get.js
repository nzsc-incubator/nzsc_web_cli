import { write2Ln, writeJson2Ln } from '../io';

const get = async (args, state) => {
  const key = args[0];
  if (key === undefined) {
    writeJson2Ln(state);
  } else {
    write2Ln(state[key]);
  }
};

export default get;
