const axios = require("axios");
  
test("generate endpoint returns expected result", async () => {
	expect.assertions(1);
	const expectedResult = [
		[null, 0, 1, 1, 2, 3],
		[0, 0, 0, 0, 0, 0],
		[1, 0, 1, 1, 2, 3],
		[1, 0, 1, 1, 2, 3],
		[2, 0, 2, 2, 4, 6],
		[3, 0, 3, 3, 6, 9],
	];
	
	const fetchResponse = axios.get("http://localhost:3000/generate?n=5")
		.then((result) => result.data.table)
		.catch(() => Promise.reject("request to server failed"));

	await expect(fetchResponse).resolves.toEqual(expectedResult);
});