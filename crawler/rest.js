const http = require('../framework/httpClient');
const config = require('../config/defalut').config;

const BASE_URL = 'https://api.huobipro.com';

// "bids": 买盘,[price(成交价), amount(成交量)], 按price降序
// "asks": 卖盘,[price(成交价), amount(成交量)], 按price升序

var orderbook = {};

exports.OrderBook = orderbook;

function price_ask(a, b) {
    return a[0] - b[0];
}

function price_bid(a, b) {
    return b[0] - a[0];
}

function amount(a, b) {
  return b[1] - a[1];
}

function handle(coin, asks, bids, currency) {
    let pa = asks.sort(price_ask);
    let pb = bids.sort(price_bid);
    // let aa = asks.sort(amount);
    // let ab = bids.sort(amount);

    let symbol = (`${coin}-${currency}`).toLowerCase();
    orderbook[symbol] = {
        p_asks: pa,
        p_bids: pb,
        // a_asks: aa,
        // a_bids: ab
    };
}

function get_depth(coin, currency) {
    return new Promise(resolve => {
        let url = `${BASE_URL}/market/depth?symbol=${coin}${currency}&type=step0`;
        http.get(url, {
            timeout: 1000,
            gzip: true
        }).then(data => {
            let json = JSON.parse(data);
            let t = json.ts;
            let asks = json.tick.asks;
            let bids = json.tick.bids;

            handle(coin, asks, bids, currency);
            resolve(null);
        }).catch(ex => {
            // console.log(coin, currency, ex);
            resolve(null);
        });
    });
}

function run() {
    const list = config.coin_currency;
    const ps = [];
    list.map(item => {
        let coin = item.split('-')[0];
        let currency = item.split('-')[1];
        ps.push(get_depth(coin, currency));
    });
    // .then(() => {
    //     setTimeout(run, 100);
    // });
    Promise.all(ps).then(() => {
        setTimeout(run, 100);
    });
}

run();