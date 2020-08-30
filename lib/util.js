const axios = require('axios');
const chalk = require('chalk');

const handleError = (err) => {
  console.error(chalk.redBright(err));
  process.exitCode = 1;
};

/**
 *
 * @param {Array} rows
 * @param {*Number} colNum
 * takes in rows of csv data and splits into an array
 * then picks the value in the index of colNum and adds it into a new array
 * returns the new array as the column
 */
const getCols = (rows, colNum = 0) => {
  const column = [];
  rows.forEach((row) => {
    const rowVal = row.split(',');
    const colVal = rowVal[colNum];
    column.push(colVal);
  });
  return column;
};

const lookupCurrency = (currencies, currCode) => currencies.includes(currCode);

const fetch = (path, options) => axios(path, options);

module.exports = {
  handleError,
  getCols,
  lookupCurrency,
  fetch,
};
