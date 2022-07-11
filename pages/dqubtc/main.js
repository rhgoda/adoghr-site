function doRound(num) {
    return Math.round(num * 100) / 100;
}

let spent = 18.76;
let oldPrice = 21436;
let btc = spent/oldPrice;

let price = fetch("/api/price")
    .then((res) => res.json())
    .then((resp) => {
        document.getElementById('price').innerText = resp.price;
        document.getElementById('diff').innerText = doRound((1-oldPrice/resp.price)*100);
        let text = (oldPrice < resp.price * btc) ? "Заработал" : "Проебал";
        document.getElementById('text').innerText = text.toLocaleUpperCase();
        document.getElementById('text2').innerText = text;
        document.getElementById('newprice').innerText = doRound(resp.price * btc);
        document.getElementById('proebano').innerText = doRound(btc*(oldPrice - resp.price));
    })
