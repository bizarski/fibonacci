const yargs = require("yargs");

const {generateMultiplicationTable, generateFibonacciSequence} = require("./lib");

const argv = yargs
    .command('generate', 'Genarates a new fibonacci multiplication table', {
        size: {
            description: 'The size of the fibonacci sequence',
            alias: 'n',
            type: 'number',
        }
    })
    .help()
    .alias('help', 'h')
	.alias('size', 'n')
    .argv;

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
