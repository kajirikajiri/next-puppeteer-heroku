import express from 'express'
import admin from 'firebase-admin'

const app: express.Express = express()

app.set('port', (process.env.PORT || 3000));

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

console.log(process.env.NODE_ENV)
// GetとPostのルーティング
const router: express.Router = express.Router()
router.get('/', (req:express.Request, res:express.Response) => {
  let serviceAccount
  if (process.env.NODE_ENV === 'production' && process.env.FIRE) {
    console.log(process.env.FIRE)
    serviceAccount = JSON.parse(process.env.FIRE)
    const privateKey = process.env.private_key
    serviceAccount.privateKey = privateKey
  } else if (process.env.NODE_ENV === 'development') {
    serviceAccount = require('../8889eb754138.json');
    console.log(serviceAccount)
  }
  if (!(admin?.apps?.length > 0)) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  let db = admin.firestore();
  writeFs(db)
  readFs(db)

  console.log('hello')
  res.send(req.query)
})
router.post('/api/postTest', (req:express.Request, res:express.Response) => {
  res.send(req.body)
})
app.use(router)

// 3000番ポートでAPIサーバ起動
app.listen(app.get('port'),()=>{ console.log('Example app listening on port 3000!') })


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