# Fibonacci Multiplication Table Generator 

## Node.js API 

### Requirements 

* Node.js 13.14.0
* MongoDB Server 4.0.21

### Node.js Installation 

* Download Node.js 13.14.0 from https://nodejs.org/en/download/releases/ and install the package
* In a terminal, go to the `fibonacci-api` folder and run `npm install` 

### MongoDB Installation 

* Download MongoDB 4.0.21 from https://www.mongodb.com/try/download/community?tck=docs_server and install the package
* No need to install Compass
* Make sure MongoDB runs as a service 

### Configuring the web application

The app configuration is located in `fibonacci-api\config.json`

* serverProtocol: default is "http"
* serverHost: default is "localhost"
* serverPort: default is 3000
* testServerPort: the port where the supertest web server will run; default is 3001
* dbUri: the host and the port of MongoDB server; default is "mongodb://localhost:27017"
* dbName: the name of the database; default is "fibonaccidb"
* testDbName: the name of the test database where the automation tests will handle data; default is "fibonaccitest"

### Running the web server 

* In a terminal, go to the `fibonacci-api` folder and run `npm start`

### Running the CLI application

* In a terminal, run `node fibonacci-api\cli.js -h` for help 
* Use `-n` or `--size` to specify the size of the fibonacci sequence

### Running the tests 

* In a terminal, go to the `fibonacci-api` folder and run `npm test`
