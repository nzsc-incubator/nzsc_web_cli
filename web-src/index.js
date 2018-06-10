import { NZSCTwoPlayerGameWebInterface } from './wasm/nzsc_web_cli';

import * as commands from './commands';
import { read, writeLn, write2Ln } from './io';

const ERROR = 'terminal-error';

write2Ln('Welcome to NZSC Two-player!');

const main = async () => {
  const state = {
    uid: null,
    aOrB: null,
    id: null,
    game: NZSCTwoPlayerGameWebInterface.new(),
  };

  // Since we're using anonymous auth, we might as well automate it.
  commands.login(['silent-success'], state);

  while (true) {
    const input = await read();
    const [commandName, ...args] = input.split(' ');
    write2Ln(input);

    switch (commandName) {
      case '':
        break;

      // Porcelain
      case 'create':
        await commands.create(args, state);
        break;
      case 'join':
        await commands.join(args, state);
        break;
      case 'delete':
        await commands.delete_(args, state);
        break;
      case 'deposit':
        await commands.deposit(args, state);
        break;
      case 'help':
        await commands.help(args, state);
        break;

      // Plumbing
      case 'login':
        await commands.login(args, state);
        break;
      case 'set':
        await commands.set(args, state);
        break;
      case 'get':
        await commands.get(args, state);
        break;

      default:
        writeLn(commandName + ' is not a command.', ERROR);
        write2Ln('For help, type "help".');
    }
  }
};

main();
