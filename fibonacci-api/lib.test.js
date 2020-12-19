const {generateFibonacciSequence, generateMultiplicationTable} = require("./lib");

test("should return correct fibonacci sequence", () => {
	expect(generateFibonacciSequence(5)).toEqual([0, 1, 1, 2, 3]);
});

test("should return multiplication table from a sequence of numbers", () => {
	const expectedResult = [
		[null, 1, 2, 3],
		[1, 1, 2, 3],
		[2, 2, 4, 6],
		[3, 3, 6, 9]
	];
	expect(generateMultiplicationTable([1, 2, 3])).toEqual(expectedResult);
});
