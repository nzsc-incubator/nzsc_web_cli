import { writeLn, write2Ln } from './io';

const withCommand = (commandName) => {
  switch (commandName) {
    case 'list':
      writeLn('Usage:');
      write2Ln('list');
      write2Ln('List the name of every game room you can join.');
      break;
    case 'create':
      writeLn('Usage:');
      write2Ln('create <gameRoomName>');
      write2Ln('Create a game room with the given name.');
      break;
    case 'join':
      writeLn('Usage:');
      write2Ln('join <gameRoomName>');
      writeLn('Join the game room that has the given name.');
      write2Ln('Will throw an error if there exists no game room with the given gameId.');
      break;
    case 'delete':
      writeLn('Usage:');
      write2Ln('delete');
      writeLn('Deletes the game room you are in.');
      write2Ln('May fail if somebody else is still in the game room.');
      break;
    case 'deposit':
      writeLn('Usage:');
      write2Ln('deposit <item>');
      writeLn('Deposits the item in your vault.');
      writeLn('This is how you choose characters, boosters, and moves.');
      writeLn('<item> cannot contain spaces.');
      write2Ln('So make sure to spell multi-word moves such as "Shadow Fireball" like "ShadowFireball"');
      break;
    case 'help':
      writeLn('Usage:');
      write2Ln('help <commandName>');
      write2Ln('Learn more about the given command.');
      break;

    case 'login':
    case 'set':
    case 'get':
      write2Ln('TODO: Enter man pages for plumbing commands.');
      break;

    default:
      write2Ln('No entry for ' + commandName + '.');
  }
};

const listCommands = () => {
  write2Ln('Syntax: <command> <arg0> <arg1> <arg2> ...<argN>');
  writeLn('"Porcelain" Commands:');

  [
    'list',
    'create <gameRoomName>',
    'join <gameRoomName>',
    'delete',
    'deposit <item>',
    'help <command>'
  ].forEach((commandName) => {
    writeLn('\t' + commandName);
  });

  writeLn('');
  writeLn('"Plumbing" Commands:');

  [
    'login',
    'set <key> <value>',
    'get <key>',
  ].forEach((commandName) => {
    writeLn('\t' + commandName);
  });

  writeLn('');
  write2Ln('For more help with a specific command, type "help <command>".');
};

export default {
  withCommand,
  listCommands,
};
