const express = require("express");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const {generateMultiplicationTable, generateFibonacciSequence} = require("./lib");

const app = express();
app.use(bodyParser.json());

const config = require("./config");

const dbClient = new MongoClient(config.dbUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

function initializeRoutes (db) {
  db.collection("sequences").createIndex({ n: 1 });
  
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
	
	db.collection("sequences").findOne({ n: size }).then((doc) => {
		if(doc)
		{
			return res.status(200).json({
				table: doc.table,
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

	if(size > 60)
	{
		return res.status(400).end();
	}
			
	db.collection("sequences").findOne({ n: size }).then((doc) => {
		if(doc)
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
}

module.exports = {
	closeDb: () => {
		dbClient.close();
	},
	init: () => {
		return new Promise((resolve, reject) => {
			dbClient.connect((err) => {
				if(err)
				{
					return reject(err);
				}
					
				console.log("Connected successfully to MongoDB server");		
				
				initializeRoutes(dbClient.db(config.dbName));
				
				return resolve(app);
			});
		});
	}
};