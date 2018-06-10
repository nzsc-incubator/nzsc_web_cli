# nzsc_web_cli

An ugly but functional way to play two-player NZSC on the cloud.

## Usage

If you don't already know how to play NZSC, read [the handbook](https://nzsc-org.github.io/nzsc_handbook/book/) before continuing.

1. Look for open game rooms you can join. To do this, type `list`.
2. If any open game rooms appear, join one of them. To do this, type `join <gameRoomName>` where `<gameRoomName>` is the name of the game room you want to join.
3. If there are no open game rooms, create one. To do this, type `create <gameRoomName>` where `<gameRoomName>` is the name of the game room you want to create.
  1. Wait for somebody else to join your game room.
4. Choose your character. To do this, type `deposit <character>` where `<character>` is the character you want to choose.
  1. If you choose the same character, repeat this step to repick.
5. Choose your booster. To do this, type `deposit <booster>` where `<booster>` is the booster you want to choose.
6. Choose your move. To do this, type `deposit <moveWithNoSpaces>` where `<moveWithNoSpaces>` is the move you want to choose. **You cannot use spaces in the move name, so if you want to choose a multi-word move (e.g., Shadow Fireball), omit the space (ShadowFireball).**
  1. Repeat until somebody wins.
7. Type `delete`. This deallocates the game room, so there is more space on the server for other people to use. Don't worry if an error message appears, that's normal (It just means you were the first to leave the game room).
