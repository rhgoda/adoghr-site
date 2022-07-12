function doRound(num) {
    return Math.round(num * 100) / 100;
}

let spent = 18.76;
let oldPrice = 21436;
let btc = Math.round((spent/oldPrice)*10000000)/10000000;

let price = fetch("/api/price")
    .then((res) => res.json())
    .then((pric) => {
        console.log(pric)
        document.getElementById('bought').innerText = btc;
        document.getElementById('spent').innerText = spent;
        document.getElementById('percent').innerText = doRound((1-oldPrice/pric)*100);
        let text = (oldPrice < pric * btc) ? "ЗАРАБОТАЛ" : "ПРОЕБАЛ";
        document.getElementById('text').innerText = text;
        document.getElementById('waste').innerText = doRound(btc*(oldPrice - pric));
    })
