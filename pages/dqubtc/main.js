function doRound(num) {
    return Math.round(num * 100) / 100;
}

let spent = 18.76;
let oldPrice = 21436;
let btc = Math.round((spent/oldPrice)*10000000)/10000000;

let price = fetch("/api/price")
    .then((res) => res.json())
    .then((pric) => {
        document.getElementById('bought').innerText = btc;
        document.getElementById('spent').innerText = spent;
        document.getElementById('percent').innerText = Math.abs(doRound((1-oldPrice/pric)*100));
        let text = (oldPrice < pric) ? "ЗАРАБОТАЛ" : "ПРОЕБАЛ";
        let chng = (oldPrice < pric) ? "ПОДНЯЛСЯ" : "УПАЛ";
        document.getElementById('text').innerText = text;
        document.getElementById('chng').innerText = chng;
        document.getElementById('waste').innerText = Math.abs(doRound(btc*(oldPrice - pric)));
    })
