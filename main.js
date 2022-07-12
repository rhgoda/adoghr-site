let path = require('path');
let fs = require('fs');
let subdomain = require('express-subdomain');
let express = require('express');
let http = require('http');
let https = require('https');

let app = express();

fs.readdirSync(path.join(__dirname, '/pages'))
  .forEach(function (page) {
    if (page === 'home') {
      let homepage = require('./pages/home/index');
      app.use('/', function (req, res, next) {
        if (req.subdomains.length > 0) {
          return next();
        } else {
          return homepage(req, res, next);
        }
      });
    } else if (page !== 'notfound') {
      try {
        app.use(subdomain(page, require(path.join(__dirname, '/pages/', page)))); 
      } catch(e) {
          console.log('Pages loading error \n', e)
      }
    }
});

app.get('*', function(req, res, next) {
  let subdomain = (req.subdomains[0] === undefined) ? "home" : req.subdomains[0];
  let reqpath = path.join(__dirname, '/pages/', subdomain, req.url);
  reqpath = reqpath.replace("..", "");
  fs.promises.access(reqpath, fs.constants.F_OK)
    .then(() => 
      res.sendFile(reqpath)
    )
    .catch(() => {
      res.status(404);
      res.sendFile(path.join(__dirname, '/pages/notfound/notfound.html'));
    })
});

porthttp = 3000;
porthttps = 25565;

http.createServer(app).listen(porthttp);
https.createServer({}, app).listen(porthttps);

// Author - adoghr. 2022