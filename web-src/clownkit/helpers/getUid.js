const getUid = (firebase) => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid);
      }
    });
  })
};

export default getUid;
