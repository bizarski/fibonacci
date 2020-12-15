const argv = require("yargs")
	.alias("n", "size")
	.describe("n", "The size of the fibonacci sequence")
	.help("h")
	.alias("h", "help")
	.argv;

const {generateMultiplicationTable, generateFibonacciSequence} = require("./lib");

if(!argv.n)
{
	console.error("Error: Size not specified.");
	process.exit();
}

if(argv.n > 30)
{
	console.error("Error: Exceeded maximum allowed size.");
	process.exit();
}

const table = (generateMultiplicationTable(generateFibonacciSequence(argv.n)));
const lastRow = table[table.length-1];
const biggestNumber = lastRow[lastRow.length - 1];
const numberOfDigits = biggestNumber.toString().length;

table.forEach((row) => {
	console.log(row.map((item) => !isNaN(parseInt(item)) ? item.toString().padStart(numberOfDigits, " ") : " ".repeat(numberOfDigits)).join(" "));
});
