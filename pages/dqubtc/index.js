const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

let apiurl = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=bitcoin&CMC_PRO_API_KEY=60cb5d28-7c62-4843-af90-e19f5e83f029";

let latestPrice = {};

async function doRequest() {
    let result = {
        "price": 0,
    }
    
    let res = await fetch(apiurl)
        .then((resp) => resp.json())
        .then((json) => json["data"]["1"]["quote"]["USD"])
        .then((quote) => {
            result.price = Math.round(quote["price"]);
        })
        .then((res) => result);
    
    latestPrice = res;
}

let router = express.Router();

router.use(cors())

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/api/price', function(req, res, next) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(latestPrice))
});

doRequest()
setTimeout(doRequest, 60000);

module.exports = router;