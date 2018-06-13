const observeGuardian = (firebase, roomName, callback) => {
  const db = firebase.firestore();
  const guardianRef = db.collection('guardians').doc(roomName);
  const avRef = db.collection('aVaults').doc(roomName);
  const bvRef = db.collection('bVaults').doc(roomName);

  let cachedState = null;

  const unsubscribe = guardianRef.onSnapshot(
    {
      includeMetadataChanges: true,
    },

    async (guardianDoc) => {
      const { state } = guardianDoc.data();
      if (guardianDoc.hasPendingWrites ||  state === cachedState) {
        return;
      }
      const [aDoc, bDoc] = await Promise.all([avRef.get(), bvRef.get()]);


      callback(aDoc.data().payload, bDoc.data().payload);
    }
  );

  return unsubscribe;
};

export default observeGuardian;