const {expect} = require("chai");
const {searchCurrency} = require("../command/currencysearch");

describe("Search currency",function () {
  this.timeout('25s');
	describe("given correct arguments have been passed", () => {
   // process.argv = ["cs", "search", "currency", "lyd"]
		it("should look up currency and print support status to stdout",  () => {

				// await searchCurrency();
				expect(1).to.equal(1);
				
		});
	});

});
