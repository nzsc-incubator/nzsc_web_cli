import { NZSCTwoPlayerGameWebInterface } from './wasm/nzsc_web_cli';

import * as commands from './commands/index';
import { read, writeLn, write2Ln } from './io';

const ERROR = 'terminal-error';

write2Ln('Welcome to NZSC Two-player!');

const main = async () => {
  const state = {
    isLoggedIn: false,
    aOrB: null,
    roomName: null,
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
      case 'list':
        await commands.list(args, state);
        break;
      case 'create':
        await commands.create(args, state);
        break;
      case 'join':
        await commands.join(args, state);
        break;
      case 'destroy':
        await commands.destroy(args, state);
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

window.addEventListener('load', () => {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
});
