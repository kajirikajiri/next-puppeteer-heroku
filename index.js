var express = require('express');
var puppeteer = require('puppeteer')
var path = require('path');
var app = express();
var delay = require('delay');

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
      await delay(1000);
      await page.emulateMedia('screen')
      await page.screenshot({ path: path.join(__dirname, '002-screen.png') });

      await page.emulateMedia('print');
      await page.screenshot({ path: path.join(__dirname, '003-print.png') });

    } catch (err) {
      console.log('in error')
      console.log(err)
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