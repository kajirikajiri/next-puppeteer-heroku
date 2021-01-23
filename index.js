var express = require('express');
var puppeteer = require('puppeteer')
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
      await page.goto('https://www.cresco.co.jp/');
      await page.screenshot({ path: './image.png' });
    } catch (err) {
      // エラーが起きた際の処理
    } finally {
      await browser.close();
    }
  })();
  response.send('Hello World!')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});