const request = require("supertest");

const config = require("./config");
const server = require("./server");
  
let appInstance;

beforeAll(() => {
	return server.init().then((app) => {
		appInstance = app;
	}).catch((err) => {
		console.error(`Server exited with an error: ${err}`);
		server.closeDb();
	});
});

afterAll(() => {
	return server.closeDb();
});
  
test("generate endpoint returns expected result", () => {
	const expectedResult = [
		[null, 0, 1, 1, 2, 3],
		[0, 0, 0, 0, 0, 0],
		[1, 0, 1, 1, 2, 3],
		[1, 0, 1, 1, 2, 3],
		[2, 0, 2, 2, 4, 6],
		[3, 0, 3, 3, 6, 9],
	];
	
	return request(appInstance).get("/generate?n=5")
		.expect(200)
		.then((response) => {
			expect(response.body.table).toEqual(expectedResult);
		});
});