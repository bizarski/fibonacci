const config = require("./config");
const server = require("./server");

server.init().then((app) => {
	app.listen(config.serverPort, () => {
	  console.log(`Fibonacci API listening at ${config.serverProtocol}://${config.serverHost}:${config.serverPort}`)
	});	
}).catch((err) => {
	console.error(`Server exited with an error: ${err}`);
	server.closeDb();
	process.exit();
});
