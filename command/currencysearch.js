
const axios = require("axios");
const util = require("../lib/util");
const chalk = require("chalk");

async function searchCurrency(){
	try{
	if(!process.argv[3]){
		throw new Error("Missing required arguments, [currency ISO code]");
	}
	const isoCode = process.argv[3].toUpperCase();
	console.log(`searching currency ${isoCode}...`);
	const options = {
		method: 'get',
		redirect: 'follow',
	};
	const url = 'https://focusmobile-interview-materials.s3.eu-west-3.amazonaws.com/Cheap.Stocks.Internationalization.Currencies.csv';
	const res = await axios(url, options);

	const {data} = res;
	// get data rows without headers
	const rows = data.split('\r\n').slice(1);
	// get specific column data as an array
	const columns = util.getCols(rows, 2); // currency ISO codes

	// find if currency is available
	const isAvailableCurrency = util.lookupCurrency(columns, isoCode);
	if(isAvailableCurrency){
		console.log(chalk.green(`hurray! ${isoCode} is supported in cheap stocks Inc.`));
	} else{
		console.log(chalk.yellow(`Oops! ${isoCode} is not yet supported in cheap stocks Inc.`));
	}
	}catch (error) {
		util.handleError(error);
	}
}

module.exports = { searchCurrency, };

