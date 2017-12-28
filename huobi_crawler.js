const rest = require('./crawler/rest');
const config = require('./config/defalut').config;

// function compare(book1, book2) {
//     let diff = {};
//     for (let item of book1) {
//         let price = item[0].toFixed(8);
//         let amount = item[1];
//         diff[price] = (diff[price] || 0) + amount;
//     }
//     // console.log(diff);
//     for (let item of book2) {
//         let price = item[0].toFixed(8);
//         let amount = item[1];
//         diff[price] = (diff[price] || 0) - amount;
//     }
//     // console.log(diff);
//     for (let price in diff) {
//         if (Math.abs(diff[price]) > 0.1) {
//             if (diff[price] > 0) {
//                 console.log('  ws+', price, diff[price]);
//             } else {
//                 console.log('rest-', price, -diff[price]);
//             }
//         }
//     }
// }

// function display(p_asks, p_bids, a_asks, a_bids) {
  function display(p_asks, p_bids) {
    console.log(`|  最高价格买盘: ${p_bids[0][0].toFixed(4)}  |  最低价格买盘: ${p_bids[p_bids.length - 1][0].toFixed(4)}  |`);
    console.log(`|  最低价格卖盘: ${p_asks[0][0].toFixed(4)}  |  最高价格卖盘: ${p_asks[p_asks.length - 1][0].toFixed(4)}  |`);
    // console.log(`|  最大数量买盘: ${a_bids[0][0]} | ${a_bids[0][1]}`);
    // console.log(`|  最大数量卖盘: ${a_asks[0][0]} | ${a_asks[0][1]}`);
}

function check() {
    let symbol = config.coin_currency[0];
    console.log('--------------------- 查询结果 --------------------');
    console.log(`|  ${symbol}  时间: ${new Date().toLocaleString()}            |`);
    let p_asks = rest.OrderBook[symbol].p_asks;
    let p_bids = rest.OrderBook[symbol].p_bids;
    // let a_asks = rest.OrderBook[symbol].a_asks;
    // let a_bids = rest.OrderBook[symbol].a_bids;
    // display(p_asks, p_bids, a_asks, a_bids);
    display(p_asks, p_bids);
    console.log('--------------------------------------MangoKK------');
    console.log('\n');
    setTimeout(check, 1000);
}

setTimeout(check, 1000);