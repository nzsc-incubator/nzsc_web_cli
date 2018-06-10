import { NZSCTwoPlayerGameWebInterface } from './wasm/nzsc_web_cli';

import * as commands from './commands';
import { read, write2Ln } from './io';

write2Ln('Welcome to NZSC Two-player!');

const main = async () => {
  const state = {
    uid: null,
    aOrB: null,
    id: null,
    game: NZSCTwoPlayerGameWebInterface.new(),
  };

  // Since we're using anonymous auth, we might as well automate it.
  commands.login([], state);

  while (true) {
    const input = await read();
    const [commandName, ...args] = input.split(' ');
    write2Ln(input);

    switch (commandName) {
      case '':
        break;
      case 'login':
        await commands.login(args, state);
        break;
      case 'create':
        await commands.create(args, state);
        break;
      case 'set':
        await commands.set(args, state);
        break;
      case 'get':
        await commands.get(args, state);
        break;
      case 'delete':
        await commands.delete_(args, state);
        break;
      case 'join':
        await commands.join(args, state);
        break;
      case 'deposit':
        await commands.deposit(args, state);
        break;
      default:
        write2Ln(commandName + ' is not a command.');
    }
  }
};

main();
