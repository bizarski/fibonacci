const request = require("supertest");

const config = require("./config");
const server = require("./server");
  
let appInstance;

beforeAll(() => {
	return server.init(config.testDbName).then((app) => {
		appInstance = app;
	}).catch((err) => {
		console.error(`Server exited with an error: ${err}`);
		server.closeDb();
	});
});

afterAll(() => {
	return server.deleteTestData().then(server.closeDb);
});

describe('GET /generate', () => {
	test("should return fibonacci sequence multiplication table", () => {
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

	  
	test("should return 400 status when missing param", () => {
		return request(appInstance).get("/generate")
			.expect(400);
	});

	test("should return 400 status when invalid param", () => {
		return request(appInstance).get("/generate?n=text")
			.expect(400);
	});

	test("should return 400 status when exceeded size", () => {
		return request(appInstance).get("/generate?n=400")
			.expect(400);
	});
});
  
describe('POST /save result caching', () => {
	test("should return 201 status when successful insert", () => {
		return request(appInstance).post("/save")
			.send({ n: 6 })
			.expect(201);
	});

	test("should return 400 status when missing param", () => {
		return request(appInstance).post("/save")
			.send()
			.expect(400);
	});

	test("should return 400 status when invalid param", () => {
		return request(appInstance).post("/save")
			.send({ n: "text" })
			.expect(400);
	});

	test("should return 400 status when exceeded size", () => {
		return request(appInstance).post("/save")
			.send({ n: 400 })
			.expect(400);
	});

	test("should return 400 status when already cached", () => {
		return request(appInstance).post("/save")
			.send({ n: 6 })
			.expect(400);
	});

	test("should return expected cached result", () => {
		const expectedResult = [
			[null, 0, 1, 1, 2, 3, 5],
			[0, 0, 0, 0, 0, 0, 0],
			[1, 0, 1, 1, 2, 3, 5],
			[1, 0, 1, 1, 2, 3, 5],
			[2, 0, 2, 2, 4, 6, 10],
			[3, 0, 3, 3, 6, 9, 15],
			[5, 0, 5, 5, 10, 15, 25]
		];
		
		return request(appInstance).get("/generate?n=6")
			.expect(200)
			.then((response) => {
				expect(response.body.table).toEqual(expectedResult);
				expect(response.body.saved).toBe(true);
			});
	});
});
