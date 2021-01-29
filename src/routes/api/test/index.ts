import express from 'express'
import admin from 'firebase-admin'
import { getServiceAccount } from '../../../utils/getServiceAccount';

export const root = (req:express.Request, res:express.Response) => {
  const serviceAccount = getServiceAccount()
  if (!(admin?.apps?.length > 0)) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  let db = admin.firestore();
  writeFs(db)
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

const writeFs=(db:FirebaseFirestore.Firestore)=>{
  let docRef = db.collection('users').doc('alovelace');
  let setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });


  let aTuringRef = db.collection('users').doc('aturing');
  let setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });
}