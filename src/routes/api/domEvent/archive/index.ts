import express from 'express'
import admin from 'firebase-admin'
import { getServiceAccount } from '../../../../utils/getServiceAccount';

export const domEventArchive = (req:express.Request, res:express.Response) => {
  const serviceAccount = getServiceAccount()
  if (!(admin?.apps?.length > 0)) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  let db = admin.firestore();
  const {
    userUuid,
    eventsUuid,
    updatedAt
  } = req.body
  writeFs(db, userUuid, eventsUuid, updatedAt)
  readFs(db)

  res.send('ok')
}

const readFs = (db:FirebaseFirestore.Firestore) => {
  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
      });
    })
    .catch((err) => {
    });
}

const writeFs=(db:FirebaseFirestore.Firestore, userUuid: string, eventsUuid: string, updatedAt: string)=>{
  let docRef = db.collection('users').doc(userUuid).collection('eventsList').doc(eventsUuid);
  let set = docRef.update({
    updatedAt,
    archivedAt: updatedAt
  });
}

