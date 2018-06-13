import list from './list';
import join from './join';
import create from './create';
import onTurnEnd from './onTurnEnd';
import deposit from './deposit';
import destroy from './destroy';
import login from './login';

class Clownkit {
  constructor(firebase) {
    this.firebase = firebase;
  }

  list() {
    return list(this.firebase);
  }

  join(roomName) {
    return join(this.firebase, roomName);
  }

  create(roomName) {
    return create(this.firebase, roomName);
  }

  onTurnEnd(roomName, callback) {
    return onTurnEnd(this.firebase, roomName, callback);
  }

  deposit(roomName, aOrB, payload) {
    return deposit(this.firebase, roomName, aOrB, payload);
  }

  destroy(roomName, aOrB) {
    return destroy(this.firebase, roomName, aOrB);
  }

  login() {
    login(this.firebase);
  }
}

export default Clownkit;
