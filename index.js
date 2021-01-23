var express = require('express');
var puppeteer = require('puppeteer')
const fs = require('fs')
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  ;(async () => {
    const browser = await puppeteer.launch({
      args : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    
    try {
      console.log('in try')
      await page.goto('https://www.cresco.co.jp/',{
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      });
      await page.waitForTimeout(1000)
      await page.emulateMedia('screen')
      const buffer = await page.screenshot({ type: 'png', fullPage: true });
      fs.writeFileSync('screenshot.png', buffer.toString('binary'), 'binary')
    } catch (err) {
      console.log('in error')
      // エラーが起きた際の処理
    } finally {
      console.log('in finally')
      await browser.close();
    }
  })();
  response.send('Hello World!')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});