
const chalk = require("chalk");

const handleError = (err) => {
	console.error(chalk.redBright(err));
	process.exitCode = 1;
};

const getCols = (rows, colNum = 0) => {
	let column = [];
	for (const row of rows) {
		const rowVal = row.split(',');
		const colVal = rowVal[colNum];
		column.push(colVal);
	}
	return column;
};

const lookupCurrency = (currencies, currCode) => currencies.includes(currCode);


module.exports = { handleError, getCols, lookupCurrency, };
