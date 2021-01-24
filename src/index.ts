import express from 'express'
import { domEventCreate, domEventIndex, root } from './routes';

const app: express.Express = express()
app.set('port', (process.env.PORT || 4000));
// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ["chrome-extension://jhildnafefadjmkaodnlooikgokogkld/eventList.html", "chrome-extension://jhildnafefadjmkaodnlooikgokogkld/mainMenu.html", "chrome-extension://jhildnafefadjmkaodnlooikgokogkld/eventPlayer.html"])
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// GetとPostのルーティング
const router: express.Router = express.Router()

router.get('/api/health', (req:express.Request, res:express.Response) => {
  res.send('hi !!')
})

router.get('/api/domEvent/index', (req:express.Request, res:express.Response) => {
  console.log('yobaretaindex-')
  domEventIndex(req, res)
})

router.post('/api/domEvent/create', (req:express.Request, res:express.Response) => {
  console.log('yobareta-')
  domEventCreate(req, res)
})
router.post('/api/postTest', (req:express.Request, res:express.Response) => {
  res.send(req.body)
})
app.use(router)


// 3000番ポートでAPIサーバ起動
app.listen(app.get('port'),()=>{ console.log('Example app listening on port 3000!') })

