var express = require('express');
var puppeteer = require('puppeteer')
var app = express();
var delay = require('delay');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  ;(async () => {
    var browser = await puppeteer.launch({
      args : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    var page = await browser.newPage();
    
    var res
    try {
      console.log('in try')
      await page.goto('https://www.cresco.co.jp/',{
        waitUntil: ['load', 'networkidle0', 'domcontentloaded']
      });
      await delay(1000);
      var date = new Date();
      var ymdhms = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2)
      res = await page.screenshot({ path: `./${ymdhms}.png` });

    } catch (err) {
      console.log('in error')
      console.log(err)
      // エラーが起きた際の処理
    } finally {
      console.log('in finally')
      await browser.close();
    }
  })();
  response.send(`Hello World!: ${res}`)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});