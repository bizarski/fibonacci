function fibonacci(n) {
	if (n <= 1) { 
		return 1;
	}

	return fibonacci(n - 1) + fibonacci(n - 2);
}

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
		const result = [0];
		for(let i = 0; i < n-1; i++) {
			result.push(fibonacci(i));
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