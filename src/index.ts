import express from 'express'
import { root } from './routes';

const app: express.Express = express()
app.set('port', (process.env.PORT || 3000));
// CORSの許可
app.use((req, res, next) => {
  console.log(req, res)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// GetとPostのルーティング
const router: express.Router = express.Router()

router.get('/', (req:express.Request, res:express.Response) => {
  res.send('hi !!')
})

router.get('/api/test', (req:express.Request, res:express.Response) => {
  root(req, res)
})
router.post('/api/postTest', (req:express.Request, res:express.Response) => {
  res.send(req.body)
})
app.use(router)


// 3000番ポートでAPIサーバ起動
app.listen(app.get('port'),()=>{ console.log('Example app listening on port 3000!') })

