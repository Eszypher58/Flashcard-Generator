/*
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var firstPresident = new BasicCard(
    "Who was the first president of the United States?", 
    "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States.
console.log(firstPresidentCloze.partial);

// "George Washington was the first president of the United States.
console.log(firstPresidentCloze.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");
*/



//setup necessary module and variables
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var DB = require("./db.js");
var fs = require("fs");
var url = require("url");
var http = require('http');

//crete a server via node http
http.createServer(function (req, res) {

	var database = new DB();
	var path = url.parse(req.url).pathname;

	if (path === "/Read") {

  		console.log("read from db");
  	
  		res.writeHead(200, {"Content-Type": "application/json"});

  		console.log(res.context);

  		//The callback res.end lost context... causing an error to http in index.js 
  		//database.readDB("db", res.end);
  		//Not using callback bypass the error, which resulted in code below
  		fs.readFile("db", "utf8", function(err, data) {

  			var textPairObject = [];

				if (err) {

					console.log(err);

				} else {
				
					var dataArray = data.split("\n");
				
					for (var i = 0; i < dataArray.length-1; i++) {

						var textPair = dataArray[i].split(",");
						var basicCard = new BasicCard(textPair[0], textPair[1]);
	  					var clozeCard = new ClozeCard(textPair[0], textPair[1]);
	  					var cardArray = [basicCard, clozeCard];

						textPairObject.push(cardArray);
						//console.log("logging textPairObject:", textPairObject);

					}	

					res.end(JSON.stringify(textPairObject));

				}


		}) 	

	} else {

		if (path === "/Card") {

		  	console.log("request recieved");

		  	var textArray = url.parse(req.url).query.split("&");
		  	var fullText = textArray[0].substring(3,textArray[0].length);
		  	var cloze = textArray[1].substring(3,textArray[1].length);

		  	database.writeDB("db", fullText + "," + cloze + "\n");

		  	var basicCard = new BasicCard(fullText, cloze);
		  	var clozeCard = new ClozeCard(fullText, cloze);
		  	var cardArray = [basicCard, clozeCard];

		  	res.writeHead(200, {"Content-Type": "application/json"});
		  	res.end(JSON.stringify(cardArray));

		} else {

			fs.readFile('index.html', function (err, data) {

			    if (err) {
			    
			    	console.log(err);
			    
			    } else {
			    
			    	res.writeHead(200, {'Content-Type': 'text/html'});
			    	res.write(data);
			    	res.end();
			  	
			  	}
			
			});
		
		}
	
	}

}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');