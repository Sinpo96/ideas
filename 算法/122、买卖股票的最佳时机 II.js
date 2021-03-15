/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	// 只要找到涨的那天进行交易就行了
	let profit = 0;
	for (let i = 0; i < prices.length; i++) {
		if (prices[i] < prices[i + 1]) {
			// 涨了，卖出
			profit += (prices[i + 1] - prices[i]);
		}
	}
	return profit;
};

console.log(maxProfit([1,2,3,4,5]));
