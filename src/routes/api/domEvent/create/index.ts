import express from 'express'
import admin from 'firebase-admin'
import { getServiceAccount } from '../../../../utils/getServiceAccount';

export const domEventCreate = (req:express.Request, res:express.Response) => {
  const serviceAccount = getServiceAccount()
  if (!(admin?.apps?.length > 0)) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  console.log(req.body)

  let db = admin.firestore();
  const {
    userUuid,
    eventsUuid,
    eventsLabel,
    events
  } = req.body
  writeFs(db, userUuid, eventsUuid, eventsLabel, events)
  readFs(db)

  res.send('ok')
}

const readFs = (db:FirebaseFirestore.Firestore) => {
  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

const writeFs=(db:FirebaseFirestore.Firestore, userUuid: string, eventsUuid: string, eventsLabel: string, events: {index: number, selector: string}[])=>{
  let docRef = db.collection('users').doc(userUuid).collection('eventsList').doc(eventsUuid);
  let set = docRef.set({
    events,
    label: eventsLabel,
  });


  let aTuringRef = db.collection('users').doc('aturing');
  let setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });
}
