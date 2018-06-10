//import { NZSCTwoPlayerGameWebInterface } from './wasm/nzsc_web_cli';

import * as commands from './commands';
import { read, write2Ln } from './io';

write2Ln('Welcome to NZSC Two-player!');

const main = async () => {
  const state = {
    uid: null,
    aOrB: null,
    id: null,
  };

  while (true) {
    const input = await read();
    const [commandName, ...args] = input.split(' ');
    write2Ln(input);

    switch (commandName) {
      case '':
        break;
      case 'login':
        commands.login(args, state);
        break;
      case 'create':
        commands.create(args, state);
        break;
      case 'set':
        commands.set(args, state);
        break;
      case 'get':
        commands.get(args, state);
        break;
      case 'delete':
        commands.delete_(args, state);
        break;
      case 'delete-guardian':
        commands.deleteGuardian(args, state);
        break;
      case 'delete-a-vault':
        commands.deleteAVault(args, state);
        break;
      case 'delete-b-vault':
        commands.deleteBVault(args, state);
        break;
      case 'join':
        commands.join(args, state);
        break;
      case 'deposit':
        commands.deposit(args, state);
        break;
      default:
        write2Ln(commandName + ' is not a command.');
    }
  }
};

main();
