const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const {generateMultiplicationTable, generateFibonacciSequence} = require("./lib");

const app = express();
app.use(bodyParser.json());
const port = 3000;

const dbUrl = "mongodb://localhost:27017";
const dbName = "fibonaccidb";
const dbClient = new MongoClient(dbUrl);

dbClient.connect((err) => {
  if(err)
  {
	  console.error("Could not connect to DB");
	  console.error(err);
	  process.exit();
  }
	
  console.log("Connected successfully to MongoDB server");

  const db = dbClient.db(dbName);
  
  app.get("/generate", (req, res) => {
	if(!req.query.n)
	{
		return res.status(400).end();
	}
	
	if(isNaN(parseInt(req.query.n, 10)))
	{
		return res.status(400).end();
	}
	
	const size = parseInt(req.query.n, 10);
	
	if(size > 60)
	{
		return res.status(400).end();
	}
	
	db.collection("sequences").findOne({ n: size }).then((dbres) => {
		if(dbres)
		{
			return res.status(200).json({
				table: dbres.table,
				saved: true
			});
		}

		res.status(200).json({
			table: generateMultiplicationTable(generateFibonacciSequence(size)),
			saved: false
		});
	});
  });
  
  app.post("/save", (req, res) => {
	if(!req.body.n)
	{
		return res.status(400).end();
	}
	
	if(isNaN(parseInt(req.body.n, 10)))
	{
		return res.status(400).end();
	}
	
	const size = parseInt(req.body.n, 10);

	if(size > 25)
	{
		return res.status(400).end();
	}
			
	db.collection("sequences").findOne({ n: size }).then((dbres) => {
		if(dbres)
		{
			return res.status(400).end();
		}
		
		const result = generateMultiplicationTable(generateFibonacciSequence(size));
		
		db.collection("sequences").insertOne({
			n: size,
			table: result
		});
		
		res.status(201).json({
			table: result,
			saved: true
		});
	});
  });
});

app.listen(port, () => {
  console.log(`Fibonacci API listening at http://localhost:${port}`)
});