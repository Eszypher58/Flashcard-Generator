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

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var url = require("url");
var fs = require("fs");
var index = fs.readFileSync("index.html");


function buildHTML(req) {

	var header = '<title>Nodejs</title>';
	var body = '<h1>Hello World</h1>';

	return '<!DOCTYPE html>'
       + '<html><header>' + header + '</header><body>' + body + '</body></html>';

}

var http = require('http');
http.createServer(function (req, res) {

	//console.log(req);
	//console.log(res);
	//var html = buildHTML(req);

	//var html = 

  //res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': index.length,});
  //res.write(index);
  //res.end();

  //console.log(url.parse(req.url));

  var path = url.parse(req.url).pathname;

  //console.log(pathArray[0]);
  //console.log(pathArray[1]);

  if (path === "/BasicCard") {

  	console.log("request recieved");

  	var textArray = url.parse(req.url).query.split("&");

  	//console.log(textArray[0]);
  	//console.log(textArray[1]);

  	var fullText = textArray[0].substring(3,textArray[0].length);
  	var cloze = textArray[1].substring(3,textArray[1].length);

  	var basicCard = new BasicCard(fullText, cloze);
  	var clozeCard = new ClozeCard(fullText, cloze);

  	var cardArray = [basicCard, clozeCard];

  	res.writeHead(200, {"Content-Type": "application/json"});

  	res.end(JSON.stringify(cardArray));

  	 


  } else {

  fs.readFile('index.html', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
  	});
  }

/*
   fs.readFile('javascript.js', "utf8", function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        console.log(data);
        res.write(data);
        res.end();
      });


   fs.readFile('style.css', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      });
      */
/*
  if(req.url.indexOf('.html') != -1){ //req.url has the pathname, check if it conatins '.html'

  	console.log("html");

      fs.readFile('index.html', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });

    }

    if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

      fs.readFile('javascript.js', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });

    }

    if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

      fs.readFile('style.css', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(data);
        res.end();
      });

    }

    console.log("readed end without going into if...");
*/
}).listen(8080, '127.0.0.1');
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');