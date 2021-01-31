import express from 'express'
import { domEventArchive, domEventCreate, domEventIndex, domEventUpdate } from './routes';

const app: express.Express = express()

app.set('port', (process.env.PORT || 4000));
// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "chrome-extension://jhildnafefadjmkaodnlooikgokogkld")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// body-parserに基づいた着信リクエストの解析
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (req:express.Request, res:express.Response) => {
  res.json('hi !!')
})

app.get('/api/domEvent/index', (req:express.Request, res:express.Response) => {
  domEventIndex(req, res)
})

app.post('/api/domEvent/create', (req:express.Request, res:express.Response) => {
  domEventCreate(req, res)
})

app.post('/api/domEvent/update', (req:express.Request, res:express.Response) => {
  domEventUpdate(req, res)
})

app.post('/api/domEvent/archive', (req:express.Request, res:express.Response) => {
  domEventArchive(req, res)
})

app.post('/api/postTest', (req:express.Request, res:express.Response) => {
  res.send(req.body)
})


// 3000番ポートでAPIサーバ起動
app.listen(app.get('port'),()=>{ console.log('Example app listening on port 4000!') })
