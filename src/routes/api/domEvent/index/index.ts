import express from 'express'
import admin from 'firebase-admin'
import { getServiceAccount } from '../../../../utils/getServiceAccount';

export const domEventIndex = (req:express.Request, res:express.Response) => {
  const serviceAccount = getServiceAccount()
  if (!(admin?.apps?.length > 0)) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  let db = admin.firestore();
  const {
    userUuid,
  } = req.query
  if (typeof userUuid ==='string') {
    readFs(db, userUuid).then((result)=>{
      res.send(result)
    }).catch((err)=>{
      res.send([{}])
    })
  }

}

const readFs = (db:FirebaseFirestore.Firestore, userUuid: string) => {
  const result = db.collection('users').doc(userUuid).collection('eventsList').get()
    .then((snapshot) => {
      let result:{}[] = []
      snapshot.forEach((doc) => {
        if (typeof doc.data().archivedAt === 'undefined'){
          result.push(doc.data())
        }
      });
      return result
    })
    .catch((err) => {
      return [{}]
    });
  return result
}
