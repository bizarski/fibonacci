function getMultiplicationRow(multiplicator, numbers) {		
	const result = [];
	result.push(multiplicator);
	numbers.forEach((n) => {
		result.push(n * multiplicator);
	});
	return result; 
}

module.exports = {
	generateFibonacciSequence: function(n) {
		const result = [0, 1];
		for(let i = 0; i < n-2; i++) {
			let nextNumber = result[result.length - 1] + result[result.length - 2];
			result.push(nextNumber);
		}

		return result;
	},
	generateMultiplicationTable: function(sequence) {
		let result = sequence.map((multiplicator) => {
			return getMultiplicationRow(multiplicator, sequence);
		});
		
		result.unshift([null].concat(sequence));
		return result;
	}
};