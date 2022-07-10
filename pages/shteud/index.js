const express = require("express");
let router = express.Router();
require('dotenv').config()
const path = require('path');
const puppeteer = require('puppeteer');

let subdomain = "10100";
// //=================================SERV
router.get('*', function (req, res, next) {
  if (req.subdomains[0] === subdomain) {
    next();
  }
});

router.get('/', function (req, res) {
  res.set('Cache-Control', 'no-store')
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/index.css', function (req, res) {
  res.set('Cache-Control', 'no-store')
  res.sendFile(path.join(__dirname, 'index.css'));
});

router.get('/main.js', function (req, res) {
  res.set('Cache-Control', 'no-store')
  res.sendFile(path.join(__dirname, 'main.js'));
});

router.get('/example.png', function (req, res) {
  res.set('Cache-Control', 'no-store')
  res.sendFile(path.join(__dirname, 'example.png'));
});

//==============================BOT
const { Telegraf } = require('telegraf');
bot = new Telegraf(process.env.TOKEN)
bot.launch()


//======================UPDATE
function update() {
  try {
    (async () => {
      const browser = await puppeteer.launch()//({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
      const page = await browser.newPage();
      await page.goto('https://aliexpress.ru/item/1005002907849570.html?spm=a2g2w.productlist.i3.2.7f6125a4zfKXg2&sku_id=12000022722268689');
      //await page.goto('https://yandex.com');
      await page.screenshot({ path: path.join(__dirname, 'example.png'), clip: { 
        x: 50, 
        y: 250, 
        width: 700, 
        height: 500 
      } });
      await browser.close();
    })();
  } catch (e) {
    console.log('intel update error', e);
  }

  try {
    bot.telegram.sendMediaGroup('@shteudposting', [
      {
        media: { source: path.join(__dirname, 'example.png') },
        type: 'photo'
      }
    ]);
  } catch (e) {
    console.log("telegram posting error", e);
  }
}

update();
setInterval(update, 600000);

module.exports = router;