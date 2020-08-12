const {expect} = require("chai");
const {searchCurrency} = require("../command/currencysearch");
const {getCols, handleError} = require("../lib/util");

describe("Search currency",function () {
  this.timeout('25s');
	describe("given correct arguments have been passed", () => {
    const consoles = [];
    before(() => {
      console.log = (msg) => {
				consoles.push(msg);
			}
    process.argv = ["cs", "search", "currency", "lyd"]
});
		it("should look up currency and print support status to stdout",  async () => {
				
				const isSupported =  await searchCurrency();
				expect(isSupported).to.be.a("boolean");
				expect(consoles[0]).to.equal("searching currency LYD...");
				expect(consoles[1]).to.equal('\u001b[32mhurray! LYD is supported in cheap stocks Inc.\u001b[39m');
				
		});
	});

});


describe("Search utils", () => {

});
